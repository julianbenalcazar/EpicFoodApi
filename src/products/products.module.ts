import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoriesModule } from '@app/categories/categories.module';
import { CategoriesService } from '@app/categories/categories.service';
import { RestaurantsModule } from '@app/restaurants/restaurants.module';
import { RestaurantsService } from '@app/restaurants/restaurants.service';
import { UsersModule } from '@app/users/users.module';
import { UsersService } from '@app/users/users.service';

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
