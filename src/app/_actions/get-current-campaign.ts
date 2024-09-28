'use server';

import { db } from '../_lib/prisma';

export const getCurrentCampaign = async () => {
  const campaign = await db.campaign.findFirst({
    where: {
      active: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return campaign;
};
