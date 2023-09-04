import { IsDecimal } from "class-validator";
import { Category } from "src/categories/entities/category.entity";
import { Detail } from "src/detail/entities/detail.entity";
import { Column, DeleteDateColumn, Double, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";


@Entity()
export class Product {
    @Column({primary: true, generated: true})
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 250 })
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ length: 500 })
    image: string;

    @Column({default: 10})
    stock: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn()
    category: Category;

    @OneToMany(() => Detail, (detail) => detail.product)
    details: Detail[];
}
