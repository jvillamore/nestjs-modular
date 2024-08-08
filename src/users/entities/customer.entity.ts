import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn({ comment: 'Unique ID of the customer table' })
  id: number;
  @Column({
    name: 'name',
    comment: "Customer' name",
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'last_name',
    comment: "Customer's lastname",
    type: 'varchar',
    length: 255,
  })
  lastName: string;

  @Column({
    name: 'phone',
    comment: "Customer's Phone number",
    type: 'varchar',
    length: 255,
  })
  phone: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creación del registro',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualización del registro',
  })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
