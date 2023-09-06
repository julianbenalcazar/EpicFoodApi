import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderstatusModule } from './orderstatus/orderstatus.module';
import { ReviewsModule } from './reviews/reviews.module';
import { DetailModule } from './detail/detail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Usamos "postgres" en lugar de "mysql" para PostgreSQL
      host: 'localhost',
      port: 5432, // Puerto predeterminado de PostgreSQL
      username: 'postgres',
      password: '',
      database: 'epic_foodv1',
      autoLoadEntities: true,
      migrations: ['@app/migrations/*.js'],
      synchronize: true,
      extra: {
        array: true,
      }
    }),
    UsersModule,
    DeliveriesModule,
    RestaurantsModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    OrderstatusModule,
    ReviewsModule,
    DetailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
