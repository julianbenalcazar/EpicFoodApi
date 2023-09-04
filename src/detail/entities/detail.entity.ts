import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Detail {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  quantity: number;

  @DeleteDateColumn()
    deletedAt: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Order, (order) => order.details)
  order: Order;

  @ManyToOne(() => Product, (product) => product.details)
  product: Product;
}
