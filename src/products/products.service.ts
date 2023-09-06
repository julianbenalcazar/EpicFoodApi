import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '@app/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { categoryId, name } = createProductDto;
    const product = await this.findOneByName(name);
    if (product) {
      throw new HttpException(
        `El producto ${product.name} ya existe.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const category = await this.categoryService.findOne(categoryId);
    if (category) {
      const newProduct = new Product();
      newProduct.category = category;
      newProduct.name = createProductDto.name;
      newProduct.price = createProductDto.price;
      newProduct.description = createProductDto.description;
      newProduct.image = createProductDto.image;
      newProduct.stock = createProductDto.stock;
      return await this.productRepository.save(newProduct);
    }
  }

  async findAll() {
    try {
      return await this.productRepository.find({
        relations: ['category'],
      });
    } catch (error) {
      throw new HttpException(
        `Error al optener los productos. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository
        .createQueryBuilder('product')
        .where('product.id = :id', { id })
        .leftJoinAndSelect('product.category', 'category')
        .getOne();
      if (product) {
        return product;
      }
      throw new HttpException(
        'Este producto no existe.',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        `Error al optener producto por id. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByName(name: string) {
    try {
      const product = await this.productRepository.findOneBy({ name });
      if (product) {
        return product;
      }
    } catch (error) {
      throw new HttpException(
        'Error al optener producto por nombre.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findOne(id);
      if (!product) {
        throw new HttpException(
          'Esta producto no existe.',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      throw new HttpException(
        `Error no se pudo actualizar la categorya. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const product = await this.findOne(id);
      if (product) {
        return this.productRepository.softDelete(id);
      }
      throw new HttpException(
        `No existe este producto.`,
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        `Error al eliminar el producto. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
