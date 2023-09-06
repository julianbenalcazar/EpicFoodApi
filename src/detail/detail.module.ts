import { Module, forwardRef } from '@nestjs/common';
import { DetailService } from './detail.service';
import { DetailController } from './detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detail } from './entities/detail.entity';
import { ProductsService } from '@app/products/products.service';
import { OrdersService } from '@app/orders/orders.service';
import { CategoriesService } from '@app/categories/categories.service';
import { ProductsModule } from '@app/products/products.module';
import { OrdersModule } from '@app/orders/orders.module';
import { CategoriesModule } from '@app/categories/categories.module';
import { UsersModule } from '@app/users/users.module';
import { UsersService } from '@app/users/users.service';
import { RestaurantsModule } from '@app/restaurants/restaurants.module';
import { RestaurantsService } from '@app/restaurants/restaurants.service';
import { DeliveriesModule } from '@app/deliveries/deliveries.module';
import { DeliveriesService } from '@app/deliveries/deliveries.service';
import { OrderstatusService } from '@app/orderstatus/orderstatus.service';
import { OrderstatusModule } from '@app/orderstatus/orderstatus.module';

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
