import { PartialType } from '@nestjs/mapped-types';
import { RoundDto } from './round.dto';

export class UpdateRoundDto extends PartialType(RoundDto) {}
