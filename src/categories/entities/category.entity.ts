import { Product } from "src/products/entities/product.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";


@Entity()
export class Category {
    @Column({ primary: true, generated: true})
    id: number;

    @Column({length: 100})
    name: string;

    @Column({length: 500})
    image: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.categories)
    @JoinColumn()
    restaurant: Restaurant;

    @OneToMany(() => Product, (product) => product.category)
    @JoinColumn()
    products: Product[];

}
