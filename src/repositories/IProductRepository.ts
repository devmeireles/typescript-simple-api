import { Product } from "@entities/Product";

export interface IProductRepository {
  create(Product: Product): Promise<void>;
}
