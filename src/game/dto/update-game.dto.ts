import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateGameDto {
  @IsString()
  name?: string;

  @IsString()
  descripton?: string;

  @IsBoolean()
  finished?: boolean;

  @IsNumber()
  moderatorId?: number;
}
