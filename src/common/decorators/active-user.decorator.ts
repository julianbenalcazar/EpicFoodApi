import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Decorador personalizado para devolver el usuario autenticado.
 */
export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
