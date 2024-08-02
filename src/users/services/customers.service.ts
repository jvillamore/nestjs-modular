import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRep: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRep.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRep.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = this.customerRep.create(data);
    return this.customerRep.save(newCustomer).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }

  async update(id: number, changes: UpdateCustomerDto) {
    // Busca el registro
    const customer = await this.customerRep.findOneBy({ id });
    // Actualiza el registro.
    this.customerRep.merge(customer, changes);
    // Guarda los cambios.
    return this.customerRep.save(customer).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return this.customerRep.delete(id).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }
}
