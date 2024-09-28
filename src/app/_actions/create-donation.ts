'use server';

import { DonationType } from '@prisma/client';
import { db } from '../_lib/prisma';

interface CreateDonationProps {
  donor?: string;
  total: number;
  transactionId: string;
  campaignId: string;
  donationType: DonationType;
}

export const createDonation = async ({
  donor,
  total,
  transactionId,
  donationType,
  campaignId,
}: CreateDonationProps) => {
  const donation = await db.donation.create({
    data: {
      donor,
      total,
      transactionId,
      donationType,
      campaignId,
    },
  });

  return donation;
};
