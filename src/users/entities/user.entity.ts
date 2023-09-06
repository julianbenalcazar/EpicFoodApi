import { Role } from 'src/common/enums/role.enum';
import { Delivery } from 'src/deliveries/entities/delivery.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Review } from 'src/reviews/entities/review.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ length: 500 })
  image: string;

  @Column({ length: 20, unique: true })
  identification: string;

  @Column({ length: 10, unique: true })
  phone: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100, select: false })
  password: string;

  @Column('text', { array: true, transformer: new Array() })
  address: string[];

  @Column({ default: 0 })
  attempts: number;

  @Column({ length: 2, default: 'A' })
  status: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Delivery, (delivery) => delivery.user)
  @JoinColumn()
  deliveries: Delivery[];

  @OneToOne(() => Restaurant, (restaurant) => restaurant.owner)
  @JoinColumn()
  restaurant: Restaurant;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.user)
  orderes: Order[];
}
