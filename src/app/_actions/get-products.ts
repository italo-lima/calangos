'use server';

import { db } from '../_lib/prisma';

export const getProducts = () => {
  return db.product.findMany();
};
