import { Module, forwardRef } from '@nestjs/common';
import { OrderstatusService } from './orderstatus.service';
import { OrderstatusController } from './orderstatus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orderstatus } from './entities/orderstatus.entity';
import { OrdersService } from '@app/orders/orders.service';
import { OrdersModule } from '@app/orders/orders.module';
import { RestaurantsService } from '@app/restaurants/restaurants.service';
import { DeliveriesService } from '@app/deliveries/deliveries.service';
import { UsersService } from '@app/users/users.service';
import { RestaurantsModule } from '@app/restaurants/restaurants.module';
import { DeliveriesModule } from '@app/deliveries/deliveries.module';
import { UsersModule } from '@app/users/users.module';

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
