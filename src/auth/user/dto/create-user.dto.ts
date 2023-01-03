import { UpdateUserDto } from './update-user.dto';
import { OmitType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { Match } from '../../../decorators/match.decorator';

export class CreateUserDto extends OmitType(UpdateUserDto, ['id'] as const) {
  @IsString()
  @Match<CreateUserDto>('password')
  confirmPassword: string;
}
