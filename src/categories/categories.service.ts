import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { RestaurantsService } from '@app/restaurants/restaurants.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly restaurantService: RestaurantsService,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { restaurantId, name } = createCategoryDto;
    const restaurant = await this.restaurantService.findOne(restaurantId);
    const category = await this.findOneByName(name);
    try {
      if (category) {
        throw new HttpException(
          `La categoria ${category.name} ya existe.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (restaurant) {
        const newCategory = new Category();
        newCategory.restaurant = restaurant;
        newCategory.name = createCategoryDto.name;
        newCategory.image = createCategoryDto.image;
        return await this.categoryRepository.save(newCategory);
      }
    } catch (error) {
      throw new HttpException(
        `Error al crear la categoria. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.find({
        relations: ['restaurant', 'products'],
      });
    } catch (error) {
      throw new HttpException(
        `Error al optener las categorias. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id = :id', { id })
        .leftJoinAndSelect('category.restaurant', 'restaurant')
        .leftJoinAndSelect('category.products', 'products')
        .getOne();
      if (category) {
        return category;
      }
      throw new HttpException(
        'Esta categoria no existe.',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        `Error al optener categoria por id. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByName(name: string) {
    try {
      const category = await this.categoryRepository.findOneBy({ name });
      if (category) {
        return category;
      }
    } catch (error) {
      throw new HttpException(
        'Error al optener categoria por nombre.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.findOne(id);
      if (!category) {
        throw new HttpException(
          'Esta categoria no existe.',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.categoryRepository.update(id, updateCategoryDto);
    } catch (error) {
      throw new HttpException(
        `Error no se pudo actualizar la categoria. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const category = await this.findOne(id);
      if (category.products.length > 0) {
        throw new HttpException(
          `La categoria ${category.name} tiene productos.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return this.categoryRepository.softDelete(id);
    } catch (error) {
      throw new HttpException(
        `Error al eliminar la categoria. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
