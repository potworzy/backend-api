import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    user: Pick<CreateUserDto, 'email' | 'password' | 'name'>,
  ): Promise<User> {
    return this.userService.create(user);
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userService.findOne({ where: { email: email } });
    if (!user) {
      throw new BadRequestException('User does not exist'); //TODO zmienić komunikat na taki sam dla user i password
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestException('Wrong password');
    }

    return user;
  }

  generateTokens(payload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get<string>('JWT_EXPIRATION_SECRET')}s`,
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get<string>(
        'JWT_EXPIRATION_REFRESH_SECRET',
      )}s`,
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    return [accessToken, refreshToken];
  }

  async setAuthToken(
    res,
    payload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = this.generateTokens(payload);

    await this.userService.update(payload.user_id, {
      refreshToken: bcrypt.hashSync(refreshToken, 8),
    });

    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        domain: this.configService.get('DOMAIN'),
        expires: new Date(
          Date.now() + this.configService.get('JWT_EXPIRATION_SECRET') * 1000,
        ),
      })
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        domain: this.configService.get('DOMAIN'),
        expires: new Date(
          Date.now() +
            this.configService.get('JWT_EXPIRATION_REFRESH_SECRET') * 1000,
        ),
      });

    return { accessToken, refreshToken };
  }

  async clearAuthTokens(res, user_id) {
    await this.userService.update(user_id, {
      refreshToken: null,
    });

    res
      .clearCookie('access_token', {
        domain: this.configService.get<string>('DOMAIN'),
        httpOnly: true,
      })
      .clearCookie('refresh_token', {
        domain: this.configService.get<string>('DOMAIN'),
        httpOnly: true,
      });
  }
  async validateUser(userId): Promise<User> {
    const condition = { where: { id: userId } };
    return this.userService.findOne(condition);
  }

  async tokenIsActive(token: string, hash: string): Promise<boolean> {
    const tokenIsActive = await bcrypt.compare(token, hash || '');
    if (!tokenIsActive) {
      throw new ForbiddenException();
    }
    return true;
  }
}
