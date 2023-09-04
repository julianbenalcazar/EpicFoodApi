import { Delivery } from 'src/deliveries/entities/delivery.entity';
import { Detail } from 'src/detail/entities/detail.entity';
import { Orderstatus } from 'src/orderstatus/entities/orderstatus.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
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
