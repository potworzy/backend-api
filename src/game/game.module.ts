import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { RoundModule } from './round/round.module';
import { TeamModule } from './team/team.module';
import { Round } from './round/round.entity';
import { Vote } from './round/vote/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), RoundModule, TeamModule],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
