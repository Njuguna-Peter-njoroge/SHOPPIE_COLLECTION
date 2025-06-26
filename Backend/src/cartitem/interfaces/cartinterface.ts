import { CartItem } from 'generated/prisma';

export interface Cart{
  id: string;
  quantity: number;
  product: string;
  user: string;
  price: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  items?: CartItem[];
}
