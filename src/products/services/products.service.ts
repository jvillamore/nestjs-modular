import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRep: Repository<Product>,
    private brandsService: BrandsService,
  ) {}

  findAll() {
    return this.productRep.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRep.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.description = data.description;
    // newProduct.image = data.image;
    // newProduct.name = data.name;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // Crea el objeto en base al DTO.
    const newProduct = this.productRep.create(data);
    if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId);
      newProduct.brand = brand;
    }
    return this.productRep.save(newProduct).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }

  async update(id: number, changes: UpdateProductDto) {
    // Busca el producto
    const product = await this.productRep.findOneBy({ id });
    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId);
      product.brand = brand;
    }
    // Actualiza el registro.
    this.productRep.merge(product, changes);
    // Guarda los cambios.
    return this.productRep.save(product).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return this.productRep.delete(id).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }
}
