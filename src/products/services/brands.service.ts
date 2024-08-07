import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRep: Repository<Brand>) {}

  findAll() {
    return this.brandRep.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRep.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRep.create(data);
    return this.brandRep.save(newBrand).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }

  async update(id: number, changes: UpdateBrandDto) {
    // Busca el producto
    const brand = await this.brandRep.findOneBy({ id });
    // Actualiza el registro.
    this.brandRep.merge(brand, changes);
    // Guarda los cambios.
    return this.brandRep.save(brand).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }

  async remove(id: number) {
    const brand = await this.findOne(id);
    if (!brand) throw new NotFoundException(`Brand #${id} not found`);
    return this.brandRep.delete(id).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }
}
