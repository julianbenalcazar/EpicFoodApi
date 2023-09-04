import { Module, forwardRef } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UsersModule } from 'src/users/users.module'; // Importa UsersModule correctamente
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    forwardRef(() => UsersModule),
  ], // Utiliza forwardRef
  controllers: [RestaurantsController],
  providers: [RestaurantsService, UsersService], // Asegúrate de que UsersService esté aquí
  exports: [TypeOrmModule],
})
export class RestaurantsModule {}
