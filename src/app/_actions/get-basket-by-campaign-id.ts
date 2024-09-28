'use server';

import { db } from '../_lib/prisma';

export const getBasketByCampaignId = async (id: string) => {
  const basket = await db.basket.findFirst({
    where: {
      campaignId: id,
    },
  });

  return basket;
};
