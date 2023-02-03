import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { Round } from '../round.entity';
import { User } from '../../../auth/user/user.entity';
import { RoundService } from '../round.service';
import { UserService } from '../../../auth/user/user.service';
import { GameService } from '../../../game/game.service';
import { Game } from '../../../game/game.entity';

@Module({
  controllers: [VoteController],
  providers: [VoteService, RoundService, UserService, GameService],
  imports: [TypeOrmModule.forFeature([Vote, Round, User, Game])],
})
export class VoteModule {}
