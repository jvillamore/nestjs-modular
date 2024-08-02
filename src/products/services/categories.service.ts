import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRep: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRep.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRep.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRep.create(data);
    return this.categoryRep.save(newCategory).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }

  async update(id: number, changes: UpdateCategoryDto) {
    // Busca el producto
    const category = await this.categoryRep.findOneBy({ id });
    // Actualiza el registro.
    this.categoryRep.merge(category, changes);
    // Guarda los cambios.
    return this.categoryRep.save(category).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException(`Brand #${id} not found`);
    return this.categoryRep.delete(id).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }
}
