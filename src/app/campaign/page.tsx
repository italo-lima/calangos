'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '../_components/ui/card';
import { Button } from '../_components/ui/button';
import { Input } from '../_components/ui/input';

interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
  img: string;
}

interface ItemBasket extends Product {
  value: number;
}

const products: Product[] = [
  { id: 1, name: 'Cuscuz', price: 4, code: 'couscous', img: '/milk.png' },
  {
    id: 2,
    name: 'Farinha de Mandioca',
    price: 7,
    code: 'cassavaFlour',
    img: '/milk.png',
  },
  { id: 3, name: 'Café (1kg)', price: 10, code: 'coffee', img: '/milk.png' },
  {
    id: 4,
    name: 'Feijão Carioca',
    price: 6,
    code: 'cariocaBeans',
    img: '/milk.png',
  },
  {
    id: 5,
    name: 'Macarrão Brandini',
    price: 4,
    code: 'brandiniPasta',
    img: '/milk.png',
  },
  {
    id: 6,
    name: 'Leite em pó',
    price: 7,
    code: 'powderedMilk',
    img: '/milk.png',
  },
  {
    id: 7,
    name: 'Arroz parbolizado',
    price: 6,
    code: 'parboiledRice',
    img: '/milk.png',
  },
  { id: 8, name: 'Aroz branco', price: 7, code: 'whiteRice', img: '/milk.png' },
  {
    id: 9,
    name: 'Sal Campeão',
    price: 1,
    code: 'championSalt',
    img: '/milk.png',
  },
  { id: 10, name: 'Açúcar', price: 5, code: 'sugar', img: '/milk.png' },
  {
    id: 11,
    name: 'Molho Sache',
    price: 3,
    code: 'sauceSachet',
    img: '/milk.png',
  },
  { id: 12, name: 'Sardinha', price: 1, code: 'sardine', img: '/milk.png' },
  { id: 13, name: 'Biscoito', price: 6, code: 'biscuit', img: '/milk.png' },
  { id: 14, name: 'Suco', price: 1, code: 'juice', img: '/milk.png' },
];

const schemaBasket = yup.object().shape({
  products: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        value: yup.number().min(0, 'O valor não pode ser negativo'),
      })
    )
    .test(
      'at-least-one-greater-than-zero',
      'Pelo menos um produto deve ter valor maior que 0',
      (values) =>
        values?.some((product) => (product?.value ? product.value > 0 : false))
    ),
});

export default function Campaign() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schemaBasket),
    mode: 'onChange',
    defaultValues: {
      products: products.map((product) => ({ id: product.id, value: 0 })),
    },
  });

  const [qrCode, setQrCode] = useState('');
  const [anonymous, setAnonymous] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="relative w-full py-10 px-4">
      <div>
        <h1 className="font-bold text-4xl">
          Trilhe e transforme <br />
          vidas com cada passo
        </h1>
        <p className="mt-4 text-xs">
          Cada trilha que você completa ajuda a fornecer alimentos para quem
          precisa. Conquiste novos caminhos e faça a diferença
        </p>
        <Button className="mt-4 bg-primary">Doar uma cesta</Button>
      </div>
      <div className="relative h-72 w-full flex justify-start mt-4">
        <Image alt="Logo da Calango" src="/trip.svg" fill />
      </div>
      <div className="rounded-2xl bg-primary my-8 py-8 px-4">
        <h3 className="text-gray-50 text-base text-center pb-4">
          Como funciona
        </h3>
        <div className="flex flex-col gap-4">
          <Card className="pt-4 flex flex-col items-center">
            <div className="relative h-16 w-16 flex justify-start mt-4">
              <Image alt="Logo da Calango" src="/grocery.png" fill />
            </div>
            <CardTitle className="text-base mt-4">
              Escolha a forma de doação
            </CardTitle>
            <CardContent className="text-xs font-light text-center mt-2">
              Opte por doar uma cesta completa ou selecione itens individuais do
              catálogo. Após escolher os produtos, clique em "Realizar Doação"
            </CardContent>
          </Card>
          <Card className="pt-4 flex flex-col items-center">
            <div className="relative h-16 w-16 flex justify-start mt-4">
              <Image alt="Logo da Calango" src="/qrcode.png" fill />
            </div>
            <CardTitle className="text-base mt-4">
              Escanei o QrCode gerado
            </CardTitle>
            <CardContent className="text-xs font-light text-center mt-2">
              Pegue seu celular, escaneie o QR Code gerado e confirme a doação
              com o valor correspondente aos produtos selecionados
            </CardContent>
          </Card>
          <Card className="pt-4 flex flex-col items-center">
            <div className="relative h-16 w-16 flex justify-start mt-4">
              <Image alt="Logo da Calango" src="/confirmation.png" fill />
            </div>
            <CardTitle className="text-base mt-4">Doação realizada</CardTitle>
            <CardContent className="text-xs font-light text-center mt-2">
              Pronto, você acabou de ajudar a transformar vidas com sua doação
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold mb-4">Catálogo</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2">
            {products.map((product, index) => (
              <Card key={product.id}>
                <CardContent className="pt-4 flex flex-col items-center">
                  <div className="relative h-16 w-16">
                    <Image
                      alt={product.name}
                      src={product.img}
                      fill
                      objectFit="contain"
                    />
                  </div>
                  <p className="text-xs mt-2">{product.name}</p>
                  <p className="text-xs font-bold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                    }).format(product.price)}
                  </p>
                </CardContent>
                <CardFooter className="flex-col">
                  <p className="flex items-center text-xs">
                    Quantidade:{' '}
                    <Controller
                      name={`products.${index}.value`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="number"
                          className="w-10 h-6 ml-2"
                          {...field}
                        />
                      )}
                    />
                  </p>
                  {errors?.products?.[index]?.value && (
                    <p className="text-xs text-center mt-2 text-red-500">
                      Valor precisar ser maior ou igual a 0
                    </p>
                  )}
                </CardFooter>
              </Card>
            ))}
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-primary max-w-40"
            >
              Realizar doação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
