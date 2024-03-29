import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RefreshAuthGuard } from '../../guards/refresh.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
//@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body() { email, password, confirmPassword, name }: CreateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.authService.register({
      email,
      password,
      confirmPassword,
      name,
    });
    const data = await this.authService.setAuthToken(res, {
      user_id: user.id,
    });
    return res.json({
      ...user,
      expiresAuth: data.expiresAuth,
      password: undefined,
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: LoginUserDto, @Res() res: Response) {
    const user = await this.authService.login({ email, password });
    const data = await this.authService.setAuthToken(res, {
      user_id: user.id,
    });
    return res.json({
      ...user,
      expiresAuth: data.expiresAuth,
      password: undefined,
    });
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req, @Res() res) {
    await this.authService.clearAuthTokens(res, req.user.id);
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

    const data = await this.authService.setAuthToken(res, {
      user_id: req.user.id,
    });

    res.json({
      ...req.user,
      expiresAuth: data.expiresAuth,
      password: undefined,
      // message: 'Token refreshed',
      // expiresAuth: data.expiresAuth,
    });
  }
}
