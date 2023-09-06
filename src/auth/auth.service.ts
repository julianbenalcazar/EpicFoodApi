import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { LoginDto } from './dto/login.dto';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '@app/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(loginDto.email);
    try {
      if (!user) {
        throw new UnauthorizedException('Usuario o password incorrecto.');
      }
      if (user.status == 'A') {
        const isPasswordValid = await bcryptjs.compare(
          loginDto.password,
          user.password,
        );
        if (!isPasswordValid) {
          if (user.attempts == 3) {
            const userInactive = new User();
            userInactive.status = 'I';
            await this.userService.update(user.id, userInactive);
            throw new UnauthorizedException(
              'Lo sentimos, por su seguridad esta cuenta ha sido deshabilitada.',
            );
          }
          const userUpdate = new User();
          userUpdate.attempts = user.attempts + 1;
          await this.userService.update(user.id, userUpdate);
          throw new UnauthorizedException('Usuario o password incorrecto.');
        }
        //Si usuario y password es correcto retornamos el token de acceso.
        const { email } = loginDto;
        const payload = { email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        return {
          token,
          email,
        };
      }
      throw new HttpException(
        `Lo sentimos su cuenta ha sido deshabilitada. Contactese con soporte.`,
        HttpStatus.BAD_GATEWAY,
      );
    } catch (error) {
      throw new HttpException(
        `Error inicio de sesion. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async profile({ email, role }: { email: string; role: string }) {
    
    return await this.userService.findOneByEmail(email);
  }
}
