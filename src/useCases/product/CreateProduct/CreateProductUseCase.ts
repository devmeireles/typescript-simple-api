import { IStoreRepository } from "@repositories/IStoreRepository";
import { IUserRepository } from "@repositories/IUserRepository";
import { IProductRepository } from "@repositories/IProductRepository";
import { ICreateProductDTO } from "./CreateProductDTO";
import { Product } from "@entities/Product";

export class CreateProductUseCase {
  constructor(
    private storeRepository: IStoreRepository,
    private userRepository: IUserRepository,
    private productRepository: IProductRepository
  ) {}

  async execute(data: ICreateProductDTO): Promise<Product> {
    const { owner_id } = data;

    const userExists = await this.userRepository.findByID(owner_id);

    if (!userExists) {
      throw new Error("This user doesn't exist.");
    }

    const storeExists = await this.storeRepository.findByOwnerID(owner_id);

    if (!storeExists) {
      throw new Error("This store doesn't exist.");
    }

    const product = new Product(data);

    await this.productRepository.create(product);

    return product;
  }
}
