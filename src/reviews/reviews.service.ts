import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { UsersService } from '@app/users/users.service';
import { RestaurantsService } from '@app/restaurants/restaurants.service';
import { UpdateRestaurantDto } from '@app/restaurants/dto/update-restaurant.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly userService: UsersService,
    private readonly restaurantService: RestaurantsService,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const { userId, restaurantId } = createReviewDto;
    try {
      const user = await this.userService.findOne(userId);
      const restaurant = await this.restaurantService.findOne(restaurantId);

      if (!user || !restaurant) {
        // Verifica si tanto el usuario como el restaurante existen.
        throw new NotFoundException('Usuario o restaurante no encontrado');
      }

      const newReview = new Review();
      newReview.user = user;
      newReview.restaurant = restaurant;
      newReview.review = createReviewDto.review;
      newReview.score = createReviewDto.score;
      newReview.reviewDate = new Date();
      return await this.reviewRepository.save(newReview);
    } catch (error) {
      throw new HttpException(
        `Error al crear la review. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.reviewRepository.find({
        relations: ['restaurant', 'user'],
      });
    } catch (error) {
      throw new HttpException(
        `Error al optener las reviews. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const review = await this.reviewRepository
        .createQueryBuilder('review')
        .where('review.id = :id', { id })
        .leftJoinAndSelect('review.restaurant', 'restaurant')
        .leftJoinAndSelect('review.user', 'user')
        .getOne();
      if (review) {
        return review;
      }
      throw new HttpException('Esta review no existe.', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `Error al optener review por id. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const review = await this.findOne(id);
      if (!review) {
        throw new HttpException(
          'Esta review no existe.',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.reviewRepository.update(id, updateReviewDto);
    } catch (error) {
      throw new HttpException(
        `Error no se pudo actualizar la review. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const review = await this.findOne(id);
      if (!review) {
        throw new HttpException(
          'La review no existe',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return this.reviewRepository.softDelete(id);
    } catch (error) {
      throw new HttpException(
        `Error al eliminar la review. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
