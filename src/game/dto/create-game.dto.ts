import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/auth/user/user.entity';
import { GameDto } from './game.dto';

export class CreateGameDto extends PickType(GameDto, [
  'title',
  'description',
] as const) {
  user: User;
}
