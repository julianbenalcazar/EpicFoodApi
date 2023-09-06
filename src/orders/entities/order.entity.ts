import { Delivery } from '@app/deliveries/entities/delivery.entity';
import { Detail } from '@app/detail/entities/detail.entity';
import { Orderstatus } from '@app/orderstatus/entities/orderstatus.entity';
import { Restaurant } from '@app/restaurants/entities/restaurant.entity';
import { User } from '@app/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Order {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.orderes)
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orderes)
  restaurant: Restaurant;

  @ManyToOne(() => Delivery, (delivery) => delivery.orderes)
  delivery: Delivery;

  @ManyToOne(() => Orderstatus, (ostatus) => ostatus.orders)
  status: Orderstatus;

  @OneToMany(() => Detail, (detail) => detail.order)
  details: Detail[];

  @DeleteDateColumn()
  deletedAt: Date;
}
