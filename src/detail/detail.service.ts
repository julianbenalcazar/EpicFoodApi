import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Detail } from './entities/detail.entity';
import { Repository } from 'typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class DetailService {
  constructor(
    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,
    private readonly orderService: OrdersService,
    private readonly productService: ProductsService,
  ) {}

  async create(createDetailDto: CreateDetailDto) {
    const { orderId, productId, quantity, total } = createDetailDto;
    try {
      const order = await this.orderService.findOne(orderId);
      const product = await this.productService.findOne(productId);
      if(!order || !product){
        throw new HttpException(
          `La orden o producto no existen.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const newDetail = new Detail();
      newDetail.order = order;
      newDetail.product = product;
      newDetail.quantity = quantity;
      newDetail.total = total;
      return await this.detailRepository.save(newDetail);
    } catch (error) {
      throw new HttpException(
        `Error al crear el detalle de compra. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.detailRepository.find({
        relations: ['product', 'order'],
      });
    } catch (error) {
      throw new HttpException(
        `Error al optener los detalles de compra. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const detail = await this.detailRepository
        .createQueryBuilder('detail')
        .where('detail.id = :id', { id })
        .leftJoinAndSelect('detail.product', 'product')
        .leftJoinAndSelect('detail.order', 'order')
        .getOne();
      if (detail) {
        return detail;
      }
      throw new HttpException(
        'Este detalle de compra no existe.',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        `Error al optener orden por id. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateDetailDto: UpdateDetailDto) {
    try {
      const detail = await this.findOne(id);
      if (!detail) {
        throw new HttpException(
          'Este detalle no existe.',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.detailRepository.update(id, updateDetailDto);
    } catch (error) {
      throw new HttpException(
        `Error no se pudo actualizar el detalle. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const detail = await this.findOne(id);
      if (!detail) {
        throw new HttpException(
          `No existe este detalle de compra.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.detailRepository.softDelete(id);
    } catch (error) {
      throw new HttpException(
        `Error al eliminar el detalle de compra. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
