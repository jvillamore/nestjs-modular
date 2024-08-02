import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn({ comment: 'Unique ID of the customer table' })
  id: number;
  @Column({
    comment: "Customer' name",
    type: 'character varying',
    length: 255,
  })
  name: string;
  @Column({
    comment: "Customer's lastname",
    type: 'character varying',
    length: 255,
  })
  lastName: string;
  @Column({
    comment: "Customer's Phone number",
    type: 'character varying',
    length: 255,
  })
  phone: string;
}
