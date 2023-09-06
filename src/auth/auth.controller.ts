import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { RequestWithUser } from './interface/request-with-user.interface';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/role.enum';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Get('profile')
  // @Roles(Role.USER)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(@Req() req: RequestWithUser) {
  //   return this.authService.profile(req.user);
  // }

  /**
   * Ruta controlada con el decorador personalizado @Auth
   * Este decorador remplaza al @Roles y @UseGuards
   * @param req 
   * @returns 
   */
  @Get('profile')
  @Auth(Role.USER)
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }
}
