import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeliveriesModule } from '@app/deliveries/deliveries.module';
import { DeliveriesService } from '@app/deliveries/deliveries.service';
import { RestaurantsModule } from '@app/restaurants/restaurants.module';
import { RestaurantsService } from '@app/restaurants/restaurants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    DeliveriesModule,
    RestaurantsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, DeliveriesService, RestaurantsService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
