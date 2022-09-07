import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../repositories/product.repository";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async findOne(uid: string) {
        return await this.productRepository.findOne(1);
    }
}