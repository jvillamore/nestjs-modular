import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ comment: 'Unique ID of the product table' })
  id: number;
  @Column({
    comment: "Product's name",
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;
  @Column({
    comment: 'Product description',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  description: string;
  @Column({
    comment: 'Product price',
    type: 'decimal',
    scale: 2,
    precision: 10,
  })
  price: number;
  @Column({
    comment: 'Product stock',
    type: 'bigint',
  })
  stock: number;
  @Column({
    comment: 'Product image URL',
    type: 'varchar',
    length: 255,
  })
  image: string;
}
