import { PickType } from '@nestjs/mapped-types';
import { RoundDto } from './round.dto';

export class CreateRoundDto extends PickType(RoundDto, [
  'name',
  'description',
  'game',
] as const) {}
