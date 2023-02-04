import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class GameDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsBoolean()
  finished?: boolean;

  @IsNumber()
  moderatorId?: number;
}
