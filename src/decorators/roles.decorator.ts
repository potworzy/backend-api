import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator';
import { Role } from './roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
