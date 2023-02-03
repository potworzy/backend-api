import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './game.entity';
import { GameService } from './game.service';

@Controller('game')
@UseGuards(JwtAuthGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get('mygames')
  async getOwnerGames(@Req() req: Request) {
    console.log('wysyłam')
    return await this.gameService.getMyGames(req);
  }
  @Get('mygames/:id')
  async getById(@Param('id') id: string): Promise<Game> {
    return this.gameService.getById(id);
  }
  @Post('create')
  async createGame(
    @Body() { name, descripton }: CreateGameDto,
    @Req() req,
  ): Promise<Game> {
    return await this.gameService.createGame({
      name,
      descripton,
      user: req.user,
    });
  }
  //todo get all my games
  @Patch(':id')
  async updateGame(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return await this.gameService.updateGame(id, updateGameDto);
  }
}
