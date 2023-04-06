import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}
  async createGame(data): Promise<Game> {
    return await this.gameRepository.save(data);
  }
  async getById(gameId: string): Promise<Game> {
    return await this.gameRepository
      .createQueryBuilder('game')
      .select([
        'game.id',
        'game.title',
        'game.createDateTime',
        'game.lastChangedDateTime',
        'game.description',
        'round.name',
        'round.description',
        'round.finished',
        'round.createDateTime',
        'vote.value',
        'voted.email',
        'voted.name',
      ])
      .leftJoin('game.rounds', 'round')
      .orderBy('round.createDateTime', 'ASC')
      .leftJoin('round.votes', 'vote')
      .leftJoin('vote.user', 'voted')
      .where(`game.id = '${gameId}'`)
      .getOne();
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
