import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => CategoriesModule),
    forwardRef(() => RestaurantsModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    CategoriesService,
    RestaurantsService,
    UsersService,
  ],
  exports: [TypeOrmModule],
})
export class ProductsModule {}
