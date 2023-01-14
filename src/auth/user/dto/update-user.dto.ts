import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsUUID()
  id?: number;

  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;
}
