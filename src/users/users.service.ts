import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const user = await this.findOneByEmail(createUserDto.email);
    try {
      if (!user) {
        const usu = await this.findOneByPhone(createUserDto.phone);
        if (usu) {
          throw new HttpException(
            'Numero de telefono ya existe',
            HttpStatus.BAD_REQUEST,
          );
        }
        const passwordHash = await bcryptjs.hash(password, 10);
        createUserDto.password = passwordHash;
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
      }

      if (user && user.identification === createUserDto.identification) {
        throw new HttpException(
          'Numero de identidad ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (user) {
        throw new HttpException(
          'Email ya registrado, inicie sesion',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error al crear el usuario. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find({
        relations: ['restaurant', 'deliveries', 'reviews'],
      });
    } catch (error) {
      throw new HttpException(
        `Error al optener usuarios. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .leftJoinAndSelect('user.restaurant', 'restaurant')
        .leftJoinAndSelect('user.deliveries', 'deliveries')
        .leftJoinAndSelect('user.reviews', 'reviews')
        .getOne();
      if (user) {
        return user;
      }
      throw new HttpException('Este usuario no existe', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `Error al optener usuario por id. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new HttpException(
        `Error al optener usuario por email. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmailWithPassword(email: string) {
    try {
      return await this.userRepository.findOne({ 
        where: {email},
        select: ['id', 'name', 'lastname', 'email', 'password', 'role', 'status'],
       });
    } catch (error) {
      throw new HttpException(
        `Error al optener usuario por email. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByPhone(phone: string) {
    try {
      return await this.userRepository.findOneBy({ phone });
    } catch (error) {
      throw new HttpException(
        `Error al optener usuario por numero telefonico. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new HttpException(
          'Este usuario no existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        `Error no se pudo actualizar usuario. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      if (user && user.restaurant != null) {
        throw new HttpException(
          'No se puede eliminar este usuario ya que tiene una franquicia registrada.',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (user && user.deliveries != null) {
        throw new HttpException(
          'No se puede eliminar este usuario ya que tiene repartidores activos.',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.userRepository.softDelete(id);
    } catch (error) {
      throw new HttpException(
        `Error al eliminar el usuario. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
