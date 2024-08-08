import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity()
@Index(['id', 'name'])
// Creación de indices, pueden ser varios
// @Index(['description', 'name'])
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

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'categories_products',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];
}
