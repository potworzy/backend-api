import { PickType } from '@nestjs/mapped-types';
import { GameDto } from './game.dto';

export class CreateGameDto extends PickType(GameDto, [
  'name',
  'descripton',
] as const) {}
