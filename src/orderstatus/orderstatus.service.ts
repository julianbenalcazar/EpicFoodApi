import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderstatusDto } from './dto/create-orderstatus.dto';
import { UpdateOrderstatusDto } from './dto/update-orderstatus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orderstatus } from './entities/orderstatus.entity';
import { Repository } from 'typeorm';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class OrderstatusService {
  constructor(
    @InjectRepository(Orderstatus)
    private readonly orderStatusRepository: Repository<Orderstatus>,
  ) {}

  async create(createOrderstatusDto: CreateOrderstatusDto) {
    const { name } = createOrderstatusDto;
    try {
      const status = await this.findOneByName(name);
      if (status) {
        throw new HttpException(
          `El estado ${status.name} ya existe.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const newStatus = new Orderstatus();
      newStatus.name = name;
      return await this.orderStatusRepository.save(newStatus);
    } catch (error) {
      throw new HttpException(
        `Error al crear el estado. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.orderStatusRepository.find({
        relations: ['orders'],
      });
    } catch (error) {
      throw new HttpException(
        `Error al optener los estados. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const status = await this.orderStatusRepository
        .createQueryBuilder('orderStatus')
        .where('orderStatus.id = :id', { id })
        .leftJoinAndSelect('orderStatus.orders', 'orders')
        .getOne();
      if (status) {
        return status;
      }
      throw new HttpException('Este estado no existe.', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `Error al optener estado por id. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByName(name: string) {
    try {
      const status = await this.orderStatusRepository.findOneBy({ name });
      if (status) {
        return status;
      }
    } catch (error) {
      throw new HttpException(
        'Error al optener categoria por nombre.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateOrderstatusDto: UpdateOrderstatusDto) {
    try {
      const status = await this.findOne(id);
      if (!status) {
        throw new HttpException(
          'Este estado no existe.',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.orderStatusRepository.update(id, updateOrderstatusDto);
    } catch (error) {
      throw new HttpException(
        `Error no se pudo actualizar el estado. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} orderstatus`;
  }
}
