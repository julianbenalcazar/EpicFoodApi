import { Order } from "src/orders/entities/order.entity";
import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Delivery {
    @Column({primary: true, generated: true})
    id: number;

    @Column({length: 100})
    name: string;

    @Column({length: 100})
    lastname: string;

    @Column({length: 500})
    vehicleImage: string;

    @Column()
    location: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(()=> User, (user) => user.deliveries)
    @JoinColumn()
    user: User;

    @OneToMany(() => Order, (order) => order.delivery, {
        eager: false,
    })
    orderes: Order[];

}
