import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ comment: 'Unique ID of the category table' })
  id: number;
  @Column({
    comment: "Category's name",
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;
}
