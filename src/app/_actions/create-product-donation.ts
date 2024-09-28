'use server';

import { db } from '../_lib/prisma';

interface createProductInDonationProps {
  donationId: string;
  productId: string;
  quantity: number;
}

export const createProductInDonation = async ({
  donationId,
  productId,
  quantity,
}: createProductInDonationProps) => {
  await db.productInDonation.create({
    data: {
      quantity,
      productId,
      donationId,
    },
  });
};
