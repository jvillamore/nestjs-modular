import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './../dtos/products.dtos';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRep: Repository<Product>,
    @InjectRepository(Category) private categoryRep: Repository<Category>,
    @InjectRepository(Brand) private brandRep: Repository<Brand>,
    private brandsService: BrandsService,
  ) {}

  findAll(params?: FilterProductsDto) {
    // descontruimos los queries del params
    const { limit, offset } = params;
    if (params)
      return this.productRep.find({
        relations: ['brand', 'categories'],
        // para enviar el limit, lo hacemos en la propiedad "take"
        take: limit,
        // para enviar el offset, lo hacemos en la propiedad "skip"
        skip: offset,
      });
    return this.productRep.find({
      relations: ['brand', 'categories'],
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
      const brand = await this.brandRep.findOneBy({ id: data.brandId });
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRep.findBy({
        id: In(data.categoriesIds),
      });
      newProduct.categories = categories;
    }

    return this.productRep.save(newProduct).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }

  async update(id: number, changes: UpdateProductDto) {
    // Busca el producto
    const product = await this.productRep.findOneBy({ id });
    if (changes.brandId) {
      const brand = await this.brandRep.findOneBy({ id: changes.brandId });
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

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRep.findOne({
      where: { id: productId },
      relations: { categories: true },
    });
    if (!product)
      throw new NotFoundException(`Product #${productId} not found`);
    if (product.categories)
      product.categories = product.categories.filter(
        (category) => category.id != categoryId,
      );
    return this.productRep.save(product).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }

  async addCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRep.findOne({
      where: { id: productId },
      relations: { categories: true },
    });
    if (!product)
      throw new NotFoundException(`Product #${productId} not found`);
    if (product.categories) {
      const category = await this.categoryRep.findOneBy({ id: categoryId });
      //product.categories?? Category[];
      product.categories.push(category);
    }
    return this.productRep.save(product).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }
}
