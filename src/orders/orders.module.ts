import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { UsersService } from 'src/users/users.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { DeliveriesService } from 'src/deliveries/deliveries.service';
import { OrderstatusModule } from 'src/orderstatus/orderstatus.module';
import { OrderstatusService } from 'src/orderstatus/orderstatus.service';

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
