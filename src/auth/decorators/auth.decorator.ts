import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

/**
 * Esta clase agrupa decoradores en uno solo,
 * decorador @Roles @UseGuards para simplificar el control de las rutas.
 * El nuevo decorador en este caso se llama @Auth
 * @param role 
 * @returns 
 */
export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
