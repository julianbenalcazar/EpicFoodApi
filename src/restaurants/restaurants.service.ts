import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { UsersService } from '@app/users/users.service';
import { IUserActive } from '@app/common/interface/user-active.interface';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    private userService: UsersService,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto, user: IUserActive) {
    const { name } = createRestaurantDto;
    const restaurantDb = await this.findOneByName(name);
    try {
      if (restaurantDb) {
        throw new HttpException(
          `El restaurante ${restaurantDb.name} ya existe.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const userLogued = await this.userService.findOne(user.id);
      if (userLogued && userLogued.restaurant == null) {
        const restaurant = new Restaurant();
        restaurant.owner = userLogued;
        restaurant.name = createRestaurantDto.name;
        restaurant.address = createRestaurantDto.address;
        restaurant.openingTime = createRestaurantDto.openingTime;
        restaurant.clousingTime = createRestaurantDto.clousingTime;
        restaurant.image = createRestaurantDto.image;
        restaurant.description = createRestaurantDto.description;

        const newRestaurant = await this.restaurantRepository.save(restaurant);

        const userRestaurant = new UpdateRestaurantDto();
        userRestaurant.restaurant = newRestaurant.id;
        await this.userService.update(user.id, userRestaurant);
        return newRestaurant;
      }
      throw new HttpException(
        'Este usuario ya tiene una franquicia registrada.',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        `Error al crear restaurante. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.restaurantRepository.find({
        relations: ['owner', 'categories', 'reviews'],
      });
    } catch (error) {
      throw new HttpException(
        'Error al optener usuarios.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const restaurant = await await this.restaurantRepository
        .createQueryBuilder('restaurant')
        .where('restaurant.id = :id', { id })
        .leftJoinAndSelect('restaurant.owner', 'owner')
        .leftJoinAndSelect('restaurant.reviews', 'reviews')
        .getOne();
      if (restaurant) {
        return restaurant;
      }
      throw new HttpException(
        'Este restaurante no esta registrado.',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al optener restaurante por id.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByName(name: string) {
    try {
      const restaurant = await this.restaurantRepository.findOneBy({ name });
      if (restaurant) {
        return restaurant;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al optener restaurante por nombre.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    try {
      const restaurant = await this.findOne(id);
      if (!restaurant) {
        throw new HttpException(
          'Este restaurante no existe.',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.restaurantRepository.update(id, updateRestaurantDto);
    } catch (error) {
      throw new HttpException(
        `Error no se pudo actualizar el restaurante. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    try {
      return this.restaurantRepository.softDelete(id);
    } catch (error) {
      throw new HttpException(
        `Error al eliminar el restaurante. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
