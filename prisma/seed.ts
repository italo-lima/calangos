const { PrismaClient } = require('@prisma/client');
const { ObjectId } = require('mongodb');

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const productsData = [
      {
        name: 'Cuscuz',
        price: 4,
        img: 'https://utfs.io/f/UM4w2mDSQyLvdFOXPepuioCYx3m8fP5e0KkQUcL6T9qSONIG',
      },
      {
        name: 'Farinha de Mandioca',
        price: 7,
        img: 'https://utfs.io/f/UM4w2mDSQyLvw39C5nu06aBlkyeOtQC7LsHwjUucNpF8bfqd',
      },
      {
        name: 'Café',
        price: 10,
        img: 'https://utfs.io/f/UM4w2mDSQyLvwm0XaIu06aBlkyeOtQC7LsHwjUucNpF8bfqd',
      },
      {
        name: 'Feijão Carioca',
        price: 6,
        img: 'https://utfs.io/f/UM4w2mDSQyLv1m8OkX2eCidUQPD7SpKn6OY4tGoMkR053syZ',
      },
      {
        name: 'Macarrão',
        price: 4,
        img: 'https://utfs.io/f/UM4w2mDSQyLvpWTNpcigqYyBlnTIQDoR4PSWw95LUFiJdN6t',
      },
      {
        name: 'Leite em pó',
        price: 7,
        img: 'https://utfs.io/f/UM4w2mDSQyLvjTi0R4YGFYCKfD8d4cnX19eBxwOobJiAmMt0',
      },
      {
        name: 'Arroz parbolizado',
        price: 6,
        img: 'https://utfs.io/f/UM4w2mDSQyLvpQuRDs6igqYyBlnTIQDoR4PSWw95LUFiJdN6',
      },
      {
        name: 'Aroz branco',
        price: 7,
        img: 'https://utfs.io/f/UM4w2mDSQyLvdTw4koapuioCYx3m8fP5e0KkQUcL6T9qSONI',
      },
      {
        name: 'Sal',
        price: 1,
        img: 'https://utfs.io/f/UM4w2mDSQyLvoXcBeqsMR1OyFk58HjueAzshZTtKLWPNQYD2',
      },
      {
        name: 'Açúcar',
        price: 5,
        img: 'https://utfs.io/f/UM4w2mDSQyLvl7Tt8NZ7GmPCcWZEsLnKTvdR6SIgM1ONyY0f',
      },
      {
        name: 'Molho Sache',
        price: 3,
        img: 'https://utfs.io/f/UM4w2mDSQyLvptyc8higqYyBlnTIQDoR4PSWw95LUFiJdN6t',
      },
      {
        name: 'Sardinha',
        price: 1,
        img: 'https://utfs.io/f/UM4w2mDSQyLvLUShNnCEhWSfYxz09MJk3TX2DUngCbtV5eli',
      },
      {
        name: 'Biscoito',
        price: 6,
        img: 'https://utfs.io/f/UM4w2mDSQyLvR71kNk8OPa9oc0wzxnYREXJvuIKqV85i76bF',
      },
      {
        name: 'Suco',
        price: 1,
        img: 'https://utfs.io/f/UM4w2mDSQyLvnOohA2WT5fLd1hYcPK2JFoe4ZBHw3vWDyu7j',
      },
    ];

    const quantities = [3, 1, 1, 2, 3, 1, 2, 1, 1, 2, 2, 1, 1, 2];

    console.log('Campanha - Criando.....');
    const campaign = await prisma.campaign.create({
      data: {
        name: 'Campanha de Natal',
        startDate: new Date('2024-10-01'),
        endDate: new Date('2024-11-30'),
      },
    });

    console.log('Campanha - Finalizado.....');

    const products = [];
    for (let i = 0; i < productsData.length; i++) {
      const product = productsData[i];
      console.log('Criando produto', product.name);

      const newProduct = await prisma.product.create({ data: product });
      products.push(newProduct);
    }

    console.log('Cesta - Criando.....');
    const basket = await prisma.basket.create({
      data: {
        description: 'Cesta completa de Natal',
        campaign: {
          connect: { id: campaign.id },
        },
      },
    });
    console.log('Cesta - Finalizado.....');

    // Preparar a lista de produtos para a cesta
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(`Salvando producto ${product.name} na cesta ${basket.name}`);
      await prisma.productInBasket.create({
        data: {
          product: {
            connect: { id: product.id },
          },
          basket: {
            connect: { id: basket.id },
          },
          quantity: quantities[i],
        },
      });
    }

    console.log('Seed Finalizada =D');
    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error('Erro ao criar as barbearias:', error);
  }
}

seedDatabase();
