import { IsString } from 'class-validator';
import { Game } from '../../../game/game.entity';
import { Vote } from '../vote/vote.entity';

export class RoundDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  votes?: Vote[];

  game?: Game;
}
