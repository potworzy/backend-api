import { Module } from '@nestjs/common';
import { RoundService } from './round.service';
import { RoundController } from './round.controller';
import { VoteModule } from './vote/vote.module';

@Module({
  controllers: [RoundController],
  providers: [RoundService],
  imports: [VoteModule],
})
export class RoundModule {}
