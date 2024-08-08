import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Record creation date',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Record update date',
  })
  updateAt: Date;

  @Column({ type: 'int', comment: 'Quantity of Products' })
  quantity: number;

  @ManyToOne(() => Product)
  product: Product;

  @Exclude()
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
