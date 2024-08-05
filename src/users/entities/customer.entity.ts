import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn({ comment: 'Unique ID of the customer table' })
  id: number;
  @Column({
    comment: "Customer' name",
    type: 'varchar',
    length: 255,
  })
  name: string;
  @Column({
    comment: "Customer's lastname",
    type: 'varchar',
    length: 255,
  })
  lastName: string;
  @Column({
    comment: "Customer's Phone number",
    type: 'varchar',
    length: 255,
  })
  phone: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creación del registro',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualización del registro',
  })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;
}
