export class CreateCartItemDto {
  userId: string;
  productId: string;
  quantity?: number; // optional, default to 1
}
