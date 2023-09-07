import { Role } from '@app/common/enums/role.enum';
import { Category } from 'src/categories/entities/category.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Restaurant {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text', { array: true, transformer: new Array() })
  address: string[];

  @Column({ nullable: true })
  openingTime: Date;

  @Column({ nullable: true })
  clousingTime: Date;

  @Column({ length: 500 })
  image: string;

  @Column({ length: 250 })
  description: string;

  @Column({ type: 'enum', default: Role.RESTAURANT, enum: Role })
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];

  @OneToMany(() => Category, (category) => category.restaurant)
  @JoinColumn()
  categories: Category[];

  @OneToMany(() => Order, (order) => order.restaurant, {
    eager: false,
  })
  orderes: Order[];

  @OneToOne(() => User, (user) => user.restaurant, { cascade: true })
  @JoinColumn()
  owner: User;
}
