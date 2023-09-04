import { Module, forwardRef } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { UsersModule } from 'src/users/users.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { UsersService } from 'src/users/users.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    forwardRef(() => UsersModule),
    forwardRef(() => RestaurantsModule),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, UsersService, RestaurantsService],
  exports: [TypeOrmModule],
})
export class ReviewsModule {}
