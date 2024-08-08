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

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Record creation date',
  })
  createAt: Date;

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

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
