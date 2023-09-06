import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Injectable()
//Guard para manejar los roles de usuario.
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no existen roles la ruta puede ser consumida.
    if (!role) {
      return true;
    }

    // Devuelve true o false dependiendo el rol del usuario enviado en el token.
    const { user } = context.switchToHttp().getRequest();
    return role === user.role;
  }
}
