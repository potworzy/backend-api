import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './game.entity';
import { Round } from './round/round.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}
  async createGame(data): Promise<Game> {
    return await this.gameRepository.save(data);
  }
  async getById(gameId: string): Promise<Game> {
    return await this.gameRepository.findOne({
      relations: ['user', 'moderator'],
      where: {
        id: gameId,
      },
      select: {
        id: true,
        createDateTime: true,
        lastChangedDateTime: true,
        name: true,
        descripton: true,
        finished: true,
        user: {
          id: true,
          name: true,
          email: true,
        },
        moderator: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
  }
  async getMyGames(req): Promise<Game[]> {
    return await this.gameRepository.find({
      where: { user: { id: req.user.id } },
    });
  }
  async updateGame(gameId: string, updateGameDto: UpdateGameDto) {
    const game = await this.gameRepository.preload({
      id: gameId,
      ...updateGameDto,
    });
    if (!game) throw new NotFoundException(`Game ${gameId} not found`);
    return this.gameRepository.save(game);
  }
}
