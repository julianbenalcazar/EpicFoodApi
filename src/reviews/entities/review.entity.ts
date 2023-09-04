import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Review {
    @Column({primary: true, generated: true})
    id: number;

    @Column('decimal', { precision: 10, scale: 2 , default: 0})
    score: number;
    
    @Column({length: 250})
    review: string;

    @Column()
    reviewDate: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
    restaurant: Restaurant;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;
    
}
