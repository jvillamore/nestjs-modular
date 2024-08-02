import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private customerRep: Repository<User>) {}

  findAll() {
    return this.customerRep.find();
  }

  findOne(id: number) {
    const user = this.customerRep.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const newCustomer = this.customerRep.create(data);
    return this.customerRep.save(newCustomer).catch((error) => {
      throw new NotFoundException(error.detail);
    });
  }

  async update(id: number, changes: UpdateUserDto) {
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
  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.customerRep.find(),
    };
  }
  getTasks() {
    return this.customerRep.find();
  }
}
