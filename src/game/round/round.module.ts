import { Module } from '@nestjs/common';
import { RoundService } from './round.service';
import { RoundController } from './round.controller';
import { VoteModule } from './vote/vote.module';
import { Round } from './round.entity';
import { Game } from '../game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from '../game.module';
import { GameService } from '../game.service';

@Module({
  controllers: [RoundController],
  providers: [RoundService, GameService],
  imports: [TypeOrmModule.forFeature([Round, Game])],
})
export class RoundModule {}
