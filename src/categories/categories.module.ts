import { Module, forwardRef } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { RestaurantsModule } from '@app/restaurants/restaurants.module';
import { RestaurantsService } from '@app/restaurants/restaurants.service';
import { UsersModule } from '@app/users/users.module';
import { UsersService } from '@app/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => RestaurantsModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    RestaurantsService,
    UsersService,
  ],
  exports: [TypeOrmModule],
})
export class CategoriesModule {}
