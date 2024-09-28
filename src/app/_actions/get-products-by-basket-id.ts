'use server';

import { db } from '../_lib/prisma';

export const getProductsByBasketId = async (id: string) => {
  const basket = await db.productInBasket.findMany({
    where: {
      basketId: id,
    },
    include: {
      product: {
        select: {
          id: true,
          price: true,
        },
      },
    },
  });

  return basket;
};
