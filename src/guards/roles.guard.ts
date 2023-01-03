// import { CanActivate, forwardRef, Inject, Injectable } from '@nestjs/common';
// import { ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { User } from '../auth/user/user.entity';
// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { Role } from '../decorators/roles.enum';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const user: User = {
//       ...request.user.user,
//     };
//     return requiredRoles.some((role) => user.role?.includes(role));
//   }
// }
