import { UpdateUserDto } from './update-user.dto';
import { PickType } from '@nestjs/mapped-types';

export class LoginUserDto extends PickType(UpdateUserDto, [
  'email',
  'password',
] as const) {}
