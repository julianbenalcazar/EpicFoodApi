import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from '@app/users/users.module';
import { RestaurantsModule } from '@app/restaurants/restaurants.module';
import { DeliveriesModule } from '@app/deliveries/deliveries.module';
import { UsersService } from '@app/users/users.service';
import { RestaurantsService } from '@app/restaurants/restaurants.service';
import { DeliveriesService } from '@app/deliveries/deliveries.service';
import { OrderstatusModule } from '@app/orderstatus/orderstatus.module';
import { OrderstatusService } from '@app/orderstatus/orderstatus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    RestaurantsModule,
    DeliveriesModule,
    OrderstatusModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    UsersService,
    RestaurantsService,
    DeliveriesService,
    OrderstatusService,
  ],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
