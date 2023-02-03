import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RoundService } from './round.service';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { GameService } from '../game.service';
import { Request } from 'express';

@Controller('round')
@UseGuards(JwtAuthGuard)
export class RoundController {
  constructor(
    private readonly roundService: RoundService,
    private readonly gameService: GameService,
  ) {}

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() { name, description }: CreateRoundDto,
    @Req() req: Request,
  ) {
    return this.roundService.create({ name, description }, req, id);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.roundService.findAll(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.roundService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoundDto: UpdateRoundDto) {
    return this.roundService.update(id, updateRoundDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundService.remove(+id);
  }
}
