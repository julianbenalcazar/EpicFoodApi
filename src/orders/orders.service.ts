import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from '@app/users/users.service';
import { RestaurantsService } from '@app/restaurants/restaurants.service';
import { DeliveriesService } from '@app/deliveries/deliveries.service';
import { OrderstatusService } from '@app/orderstatus/orderstatus.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly restaurantService: RestaurantsService,
    private readonly deliveryService: DeliveriesService,
    private readonly statusService: OrderstatusService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, deliveryId, restaurantId, statusId } = createOrderDto;
    try {
      const user = await this.userService.findOne(userId);
      const delivery = await this.deliveryService.findOne(deliveryId);
      const restaurant = await this.restaurantService.findOne(restaurantId);
      if (!user || !delivery || !restaurant) {
        throw new HttpException(
          `Usuario, Restaurante o Delivery no existen`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const status = await this.statusService.findOne(statusId);
      if (status) {
        const newOrder = new Order();
        newOrder.user = user;
        newOrder.delivery = delivery;
        newOrder.restaurant = restaurant;
        newOrder.status = status;
        newOrder.createdAt = new Date();
        return await this.orderRepository.save(newOrder);
      }
      throw new HttpException(
        `El estado ${status.name}  no existe.`,
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        `Error al generar la orden de compra. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.orderRepository.find({
        relations: ['restaurant', 'user', 'delivery', 'status'],
      });
    } catch (error) {
      throw new HttpException(
        `Error al optener las ordenes de compra. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.orderRepository
        .createQueryBuilder('order')
        .where('order.id = :id', { id })
        .leftJoinAndSelect('order.restaurant', 'restaurant')
        .leftJoinAndSelect('order.user', 'user')
        .leftJoinAndSelect('order.delivery', 'delivery')
        .leftJoinAndSelect('order.status', 'status')
        .getOne();
      if (order) {
        return order;
      }
      throw new HttpException('Esta orden no existe.', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `Error al optener orden por id. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { statusId } = updateOrderDto;
    try {
      const order = await this.findOne(id);
      if (!order) {
        throw new HttpException(
          'Esta orden no existe.',
          HttpStatus.BAD_REQUEST,
        );
      }
      const status = await this.statusService.findOne(statusId);
      if (status) {
        order.status = status;
        return await this.orderRepository.update(id, order);
      }
      throw new HttpException(
        `El estado no existe.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      throw new HttpException(
        `Error no se pudo actualizar el estado. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const order = await this.findOne(id);
      if(order){
        return this.orderRepository.softDelete(id);
      }
      throw new HttpException(
        `No existe esta orden.`,
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        `Error al eliminar la orden. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
