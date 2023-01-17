import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { UserService } from '../../..//auth/user/user.service';
import { RoundService } from '../round.service';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
    private readonly roundService: RoundService,
    private readonly userService: UserService,
  ) {}
  private async create(roundId: string, request, value: number = null) {
    const round = await this.roundService.findOne(roundId);
    if (!round) throw new BadRequestException();
    const user = await this.userService.findOne({
      where: { id: request.user.id },
    });
    if (!user) throw new BadRequestException();
    return await this.voteRepository.save({ round, user, value });
  }

  async findAll(roundId: string) {
    return await this.voteRepository.find({
      where: { round: { id: roundId } },
    });
  }

  private async findOne(voteId: string) {
    return await this.voteRepository.findOne({ where: { id: voteId } });
  }

  async update(roundId: string, request, value: number, id: string = null) {
    if (id) {
      const vote = await this.findOne(id);
      if (vote) {
        const updateVote = await this.voteRepository.preload({
          id: id,
          value,
        });
        if (!updateVote) throw new NotFoundException(`Vote ${id} not found`);
        return this.voteRepository.save(updateVote);
      }
    } else if (!id) {
      const vote2 = await this.voteRepository.find({
        where: { round: { id: roundId }, user: { id: request.user.id } },
      });
      if (!vote2[0]) {
        return await this.create(roundId, request, value);
      } else {
        return this.update(roundId, request, value, vote2[0].id);
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
