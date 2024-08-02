import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ comment: 'Unique identificador from Brand' })
  id: number;
  @Column({
    comment: "User's mail address",
    type: 'character varying',
    length: 255,
    unique: true,
  })
  email: string;
  @Column({
    comment: "User's password",
    type: 'character varying',
    length: 255,
    unique: true,
  })
  password: string;
  @Column({
    comment: "User's role",
    type: 'character varying',
    length: 255,
    unique: true,
  })
  role: string;
}
