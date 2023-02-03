import { Injectable } from '@nestjs/common';
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
  async getGameBy(conditin): Promise<Game> {
    return await this.gameRepository.findOne(conditin);
  }
  async getAllByUser(condition): Promise<Game[]> {
    return await this.gameRepository.findBy(condition);
  }
  async updateGame(id, gameDto: UpdateGameDto): Promise<Game> {
    await this.gameRepository.update(id, gameDto);
    return await this.getGameBy({ where: { id } });
  }
}
