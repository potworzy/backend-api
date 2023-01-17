import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user/user.entity';
import { DatabaseModule } from './database/database.module';
import { GameModule } from './game/game.module';
import * as Joi from '@hapi/joi';
import { Game } from './game/game.entity';
import { RoundModule } from './game/round/round.module';
import { VoteModule } from './game/round/vote/vote.module';
import { Round } from './game/round/round.entity';
import { Vote } from './game/round/vote/vote.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    TypeOrmModule.forFeature([User, Game, Round, Vote]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    DatabaseModule,
    GameModule,
    RoundModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
