import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { Response, Request } from 'express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RefreshAuthGuard } from '../../guards/refresh.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
//@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() { email, password, name }: CreateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.authService.register({ email, password, name });
    await this.authService.setAuthToken(res, {
      user_id: user.id,
    });
    return res.json({
      ...user,
      password: undefined,
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: LoginUserDto, @Res() res: Response) {
    const user = await this.authService.login({ email, password });
    await this.authService.setAuthToken(res, {
      user_id: user.id,
    });
    return res.json({
      ...user,
      password: undefined,
    });
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req, @Res() res) {
    await this.authService.clearAuthTokens(res, req.user.id);
    console.log('logout');
    return res.json({
      message: 'Logged out',
    });
  }

  @Get('refresh')
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    await this.authService.tokenIsActive(
      req?.cookies?.['refresh_token'],
      req.user.refreshToken,
    );

    await this.authService.setAuthToken(res, {
      user_id: req.user.id,
    });

    res.json({
      message: 'Token refreshed',
    });
  }
}
