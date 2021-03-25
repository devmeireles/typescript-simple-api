import { Product } from "@entities/Product";
import { getRepository } from "typeorm";
import { IProductRepository } from "../IProductRepository";

export class PostgresProductRepository implements IProductRepository {
  async create(product: Product): Promise<void> {
    await getRepository(Product).save(product);
  }
}
