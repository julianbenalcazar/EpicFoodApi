import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);
    try {
      if (!user) {
        throw new UnauthorizedException('Usuario o password incorrecto.');
      }
      const isPasswordValid = await bcryptjs.compare(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        if (user.attempts == 3) {
          throw new UnauthorizedException(
            'Lo sentimos, por su seguridad esta cuenta ha sido deshabilitada.',
          );
        }
        user.attempts += 1;
        throw new UnauthorizedException('Usuario o password incorrecto.');
      }
      //Si usuario y password es correcto retornamos el token de acceso.
      const { email } = loginDto;
      const payload = { email: user.email };
      const token = await this.jwtService.signAsync(payload);
      return {
        token,
        email,
      };
    } catch (error) {
      throw new HttpException(
        `Error inicio de sesion. ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
