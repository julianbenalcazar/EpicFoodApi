import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Repository } from 'typeorm';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    private readonly userService: UsersService,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    const { userId } = createDeliveryDto;
    const userLogued = await this.userService.findOne(userId);
    try {
      if (userLogued) {
        const newDelivery = new Delivery();
        newDelivery.user = userLogued;
        newDelivery.name = createDeliveryDto.name;
        newDelivery.lastname = createDeliveryDto.lastname;
        newDelivery.vehicleImage = createDeliveryDto.vehicleImage;
        newDelivery.location = createDeliveryDto.location;
        return await this.deliveryRepository.save(newDelivery);
      }
    } catch (error) {
      throw new HttpException(
        `Error al crear el delivery. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.deliveryRepository.find({
        relations: ['user']
      })
    } catch (error) {
      throw new HttpException(
        `Error al optener los deliveries. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const delivery = await this.deliveryRepository
        .createQueryBuilder('delivery')
        .where('delivery.id = :id', { id })
        .leftJoinAndSelect('delivery.user', 'user')
        .getOne();
      if (delivery) {
        return delivery;
      }
      throw new HttpException(
        'Este delivery no existe',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        `Error al optener delivery por id. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByName(name: string) {
    try {
      return await this.deliveryRepository.findOneBy({ name });
    } catch (error) {
      throw new HttpException(
        `Error al optener delivery por nombre. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    try {
      const delivery = await this.findOne(id);
      if (!delivery) {
        throw new HttpException(
          'Este delivery no existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.deliveryRepository.update(id, updateDeliveryDto);
    } catch (error) {
      throw new HttpException(
        `Error no se pudo actualizar el delivery. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const delivery = await this.findOne(id);
      if (!delivery) {
        throw new HttpException(
          'Este delivery no existe.',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.deliveryRepository.softDelete(id);
    } catch (error) {
      throw new HttpException(
        `Error al eliminar el delivery. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
