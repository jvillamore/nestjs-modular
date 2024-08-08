import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Entity,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  // decorador para "crear nuevos datos"
  @Expose()
  get products() {
    // tenemos items?
    if (this.items) {
      // hacemos esta transformación

      return this.items
        .filter((items) => !!items) // nos aseguramos que no sea nulo o oundefined
        .map((item) => ({
          // recorremos todos los items
          ...item,
          // le añadimos el campo "quantity" al producto
          quantity: item.quantity,
          // añadimos el identificador del item
          itemId: item.id,
        }));
    }
    return [];
  }
  // podemos crear un campo donde nos de el precio total de la orden
  @Expose()
  get total() {
    // tenemos items?
    if (this.items) {
      // hacemos esta transformación

      return this.items
        .filter((items) => !!items) // nos aseguramos que no sea nulo o oundefined
        .reduce((acum, item) => {
          // el precio total es igual a el precio por la cantidad
          const totalItem = item.product.price * item.quantity;
          // se lo sumamos al acum en cada iteración
          return acum + totalItem;
        }, 0);
    }

    return 0;
  }
}
