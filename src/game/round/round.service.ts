import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { GameService } from '../game.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { Round } from './round.entity';

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(Round) private roundRepository: Repository<Round>,
    private readonly gameService: GameService,
  ) {}
  async create(
    createRoundDto: CreateRoundDto,
    request: Request,
    gameId: string,
  ) {
    const game = await this.gameService.getById(gameId);
    if (!game) throw new NotFoundException('Game does not exist');
    if (Object.values(request.user).indexOf(game.user.id) === -1) {
      throw new ForbiddenException('tutaj');
    }
    const rounds = await this.findAll(gameId);
    for (const round of rounds) {
      round.finished = true;
      await this.update(round.id, round);
    }
    createRoundDto.game = game;
    return await this.roundRepository.save(createRoundDto);
  }

  async findAll(id: string) {
    return await this.roundRepository.find({
      where: { game: { id } },
    });
  }

  async findOne(roundId: string) {
    return await this.roundRepository.findOne({
      where: { id: roundId },
    });
  }

  async update(roundId: string, updateRoundDto: UpdateRoundDto) {
    const round = await this.roundRepository.preload({
      id: roundId,
      ...updateRoundDto,
    });
    if (!round) throw new NotFoundException(`Round ${roundId} not found`);
    return this.roundRepository.save(round);
  }
  remove(id: number) {
    return `This action removes a #${id} round`;
  }
}
