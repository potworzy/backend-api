import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { GameDto } from './game.dto';

export class UpdateGameDto extends PartialType(GameDto) {
  @IsString()
  title?: string;

  @IsString()
  descripton?: string;

  @IsBoolean()
  finished?: boolean;

  @IsNumber()
  moderatorId?: number;
}
