import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { RoundModule } from './round/round.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), RoundModule],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
