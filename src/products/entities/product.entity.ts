import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ comment: 'Unique identificador from product' })
  id: number;
  @Column({
    comment: 'Name of product',
    type: 'character varying',
    length: 255,
    unique: true,
  })
  name: string;
  @Column({
    comment: 'Description of product',
    type: 'character varying',
    length: 255,
    unique: true,
  })
  description: string;
  @Column({
    comment: 'Price of product',
    type: 'decimal',
    length: 10,
    precision: 2,
  })
  price: number;
  @Column({
    comment: 'Stock of product',
    type: 'int64',
  })
  stock: number;
  @Column({
    comment: 'URL image of product',
    type: 'character varying',
    length: 255,
  })
  image: string;
}
