import { IsNumber } from 'class-validator';
import { User } from 'src/auth/user/user.entity';
import { Round } from '../../round.entity';

export class CreateVoteDto {
  @IsNumber()
  value?: number;

  round: Round;

  user: User;
}
