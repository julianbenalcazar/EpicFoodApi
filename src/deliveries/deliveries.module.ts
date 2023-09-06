import { Module, forwardRef } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { UsersModule } from '@app/users/users.module';
import { UsersService } from '@app/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery]),
    forwardRef(() => UsersModule),
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService, UsersService],
  exports: [TypeOrmModule],
})
export class DeliveriesModule {}
