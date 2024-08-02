import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn({ comment: 'Unique ID of the Brand table' })
  id: number;
  @Column({
    comment: "Brand's name",
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;
  @Column({
    comment: 'Brand image URL',
    type: 'varchar',
    length: 255,
  })
  image: string;
}
