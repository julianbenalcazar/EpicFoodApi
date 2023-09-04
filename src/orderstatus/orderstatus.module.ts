import { Module, forwardRef } from '@nestjs/common';
import { OrderstatusService } from './orderstatus.service';
import { OrderstatusController } from './orderstatus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orderstatus } from './entities/orderstatus.entity';
import { OrdersService } from 'src/orders/orders.service';
import { OrdersModule } from 'src/orders/orders.module';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { DeliveriesService } from 'src/deliveries/deliveries.service';
import { UsersService } from 'src/users/users.service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orderstatus]),
    forwardRef(() => OrdersModule),
    forwardRef(() => RestaurantsModule),
    forwardRef(() => DeliveriesModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [OrderstatusController],
  providers: [
    OrderstatusService,
    OrdersService,
    RestaurantsService,
    DeliveriesService,
    UsersService,
  ],
  exports: [TypeOrmModule],
})
export class OrderstatusModule {}
