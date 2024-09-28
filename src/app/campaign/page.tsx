'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import QRCode from 'qrcode';

import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '../_components/ui/card';
import { Button } from '../_components/ui/button';
import { Input } from '../_components/ui/input';
import { DialogIdentification } from '../_components/DialogIdentification';
import { DialogQrCode } from '../_components/DialogQrCode';
import { getProducts } from '../_actions/get-products';
import {
  CreateDonation,
  IForm,
  InputForm,
  ItemDonation,
  Product,
} from '../interfaces';
import { createDonation } from '../_actions/create-donation';
import { createProductInDonation } from '../_actions/create-product-donation';
import { DonationType } from '../_enums/donation-type';
import { getBasketByCampaignId } from '../_actions/get-basket-by-campaign-id';
import { useToast } from '../hooks/use-toast';
import { useCampaign } from '../hooks/use-campaign';
import { getProductsByBasketId } from '../_actions/get-products-by-basket-id';

const schemaBasket = yup.object().shape({
  products: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        quantity: yup.number().required(),
      })
    )
    .required()
    .test(
      'at-least-one-greater-than-zero',
      'Pelo menos um produto deve ter valor maior que 0',
      (values) =>
        values.some((product) =>
          product.quantity ? product.quantity > 0 : false
        )
    ),
});

export default function Campaign() {
  const { campaign } = useCampaign();
  const { toast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [initialValues, setInitialValues] = useState<InputForm[]>([]);
  const [isDonationBasket, setIsDonationBasket] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schemaBasket),
    mode: 'onChange',
    defaultValues: {
      products: initialValues,
    },
  });

  const [loading, setLoading] = useState(false);
  const [dataToQrCode, setDataToQrCode] = useState<any>({});
  const [isOpenIdentificationDialog, setIsOpenIdentificationDialog] =
    useState(false);
  const [isOpenQrCodeDialog, setIsOpenQrCodeDialog] = useState(false);
  const [itemsDonation, setItemsDonation] = useState<ItemDonation[]>([]);

  const toggleIdentificationDialog = () =>
    setIsOpenIdentificationDialog((oldState) => !oldState);

  const toggleQrCodeDialog = () => {
    reset();
    setIsOpenQrCodeDialog((oldState) => !oldState);
  };

  const createNewDonation = async ({
    itemsDonation,
    total,
    donor,
    donationType,
    transactionId,
  }: CreateDonation) => {
    const donation = await createDonation({
      donor,
      total,
      transactionId,
      donationType,
      campaignId: campaign?.id!,
    });

    await Promise.all(
      itemsDonation.map((item) =>
        createProductInDonation({
          donationId: donation.id,
          productId: item.productId,
          quantity: item.quantity,
        })
      )
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 2000);
    });
  };

  const createPixCharge = async (total: number) => {
    const body = {
      calendario: { expiracao: 3600 },
      valor: { original: total },
      chave: 'chave-pix',
      solicitacaoPagador: 'Doação',
    };

    const response = {
      chave: 'd69a7123-9630-4304-9ca2-7cfe8408def9',
      solicitacaoPagador: 'Doação de Alimento',
      pixCopiaECola:
        '00020101021226990014br.gov.bcb.pix2577qrcode-h.c6pix.com/qrs1/v2/01zLZyvddi3vN6eGAwxlmwTT3dAKpOWhmpdDVMGA08kv0PRrEp520400005303986540537.005802BR5916REGRESSIVO TESTE6009Sao Paulo62070503***6304EF83',
      calendario: {
        criacao: '2024-09-28T22:22:05.820Z',
        expiracao: 3600,
      },
      txid: 'QRS1TXF1A9ZH0LHEUH8KGJVZS0BYHCDPD4V',
      revisao: 0,
      location:
        'qrcode-h.c6pix.com/qrs1/v2/01zLZyvddi3vN6eGAwxlmwTT3dAKpOWhmpdDVMGA08kv0PRrEp',
      status: 'ATIVA',
      valor: {
        original: total,
        modalidadeAlteracao: 0,
      },
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 2000);
    });
  };

  const generateQrCode = async (name: string) => {
    try {
      setLoading(true);
      const total = itemsDonation.reduce(
        (previous, current) => previous + current.value,
        0
      );

      const pixCharge: any = await createPixCharge(total);

      await createNewDonation({
        donationType: isDonationBasket
          ? DonationType.BASKET
          : DonationType.PRODUCTS,
        itemsDonation,
        total,
        transactionId: pixCharge.txid,
        donor: name,
      });

      const qrCodeUrl = await QRCode.toDataURL(pixCharge.pixCopiaECola);

      setDataToQrCode({
        url: qrCodeUrl,
        data: pixCharge,
      });
      setIsOpenIdentificationDialog(false);
      setIsOpenQrCodeDialog(true);
      setLoading(false);
      setIsDonationBasket(false);
    } catch {
      toast({
        variant: 'destructive',
        title: 'Não foi possível gerar o QrCode',
        description: 'Estamos passando por uma instabilidade',
      });
    }
  };

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const itemsDonation: ItemDonation[] = [];

    for (let index = 0; index < data.products.length; index++) {
      const item = data.products[index];

      if (item.quantity <= 0) continue;

      const product = products.find(
        (product) => product.id === String(item.id)
      );

      if (!product) return;

      itemsDonation.push({
        productId: product.id,
        quantity: item.quantity,
        value: Number(product.price) * Number(item.quantity),
      });
    }

    setIsDonationBasket(false);
    setItemsDonation(itemsDonation);
    setIsOpenIdentificationDialog(true);
  };

  const donateBasket = async () => {
    const basket = await getBasketByCampaignId(campaign?.id!);

    if (!basket) {
      return toast({
        variant: 'destructive',
        title: 'Não foi possível realizar essa ação',
        description: 'Estamos passando por uma instabilidade',
      });
    }

    const productsBasket = await getProductsByBasketId(basket.id);

    const items = productsBasket.map((item) => {
      const product = item.product;

      return {
        productId: product.id,
        quantity: item.quantity,
        value: Number(product.price) * Number(item.quantity),
      };
    });

    setIsDonationBasket(true);
    setItemsDonation(items);
    setIsOpenIdentificationDialog(true);
  };

  useEffect(() => {
    const fetch = async () => {
      const products = await getProducts();
      setInitialValues(
        products.map((product) => ({ id: product.id, quantity: 0 }))
      );
      setProducts(products);
    };

    fetch();
  }, []);

  useEffect(() => {
    if (initialValues) {
      reset({
        products: initialValues,
      });
    }
  }, [initialValues, reset]);

  return (
    <>
      <DialogIdentification
        loading={loading}
        isOpen={isOpenIdentificationDialog}
        openChange={toggleIdentificationDialog}
        callback={generateQrCode}
      />
      <DialogQrCode
        isOpen={isOpenQrCodeDialog}
        openChange={toggleQrCodeDialog}
        dataPix={dataToQrCode}
      />
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
          <Button className="mt-4 bg-primary" onClick={donateBasket}>
            Doar uma cesta básica
          </Button>
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
                Opte por doar uma cesta completa ou selecione itens individuais
                do catálogo. Após escolher os produtos, clique em "Realizar
                Doação"
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
                        name={`products.${index}.quantity`}
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
                    {errors?.products?.[index]?.quantity && (
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
    </>
  );
}
