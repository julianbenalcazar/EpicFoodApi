import { Order } from "src/orders/entities/order.entity";
import { Column, DeleteDateColumn, Entity, OneToMany } from "typeorm";


@Entity()
export class Orderstatus {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ length: 100 })
    name: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Order, (order) => order.status)
    orders: Order[];
}
