import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ comment: 'Unique identificador from Brand' })
  id: number;
  @Column({
    comment: "User's mail address",
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;
  @Column({
    comment: "User's password",
    type: 'varchar',
    length: 255,
    unique: true,
  })
  password: string;
  @Column({
    comment: "User's role",
    type: 'varchar',
    length: 255,
    unique: true,
  })
  role: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Creation date of the record',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Record update date',
  })
  updateAt: Date;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn()
  customer: Customer;
}
