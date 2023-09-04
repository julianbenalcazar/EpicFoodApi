import { Module, forwardRef } from '@nestjs/common';
import { DetailService } from './detail.service';
import { DetailController } from './detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detail } from './entities/detail.entity';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { DeliveriesService } from 'src/deliveries/deliveries.service';
import { OrderstatusService } from 'src/orderstatus/orderstatus.service';
import { OrderstatusModule } from 'src/orderstatus/orderstatus.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Detail]),
    forwardRef(() => ProductsModule),
    forwardRef(() => OrdersModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => UsersModule),
    forwardRef(() => RestaurantsModule),
    forwardRef(() => DeliveriesModule),
    forwardRef(() => OrderstatusModule),
  ],
  controllers: [DetailController],
  providers: [
    DetailService,
    ProductsService,
    OrdersService,
    CategoriesService,
    UsersService,
    RestaurantsService,
    DeliveriesService,
    OrderstatusService
  ],
  exports: [TypeOrmModule],
})
export class DetailModule {}
