import { Donation } from '@prisma/client';
import { DonationType } from '../_enums/donation-type';

export interface ItemDonation {
  productId: string;
  quantity: number;
  value: number;
}

export interface CreateDonation {
  total: number;
  donor?: string;
  transactionId: string;
  itemsDonation: ItemDonation[];
  donationType: DonationType;
}
