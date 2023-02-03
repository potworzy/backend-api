import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';

@Controller('vote')
@UseGuards(JwtAuthGuard)
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get(':id')
  findAll(@Param('id') roundId: string) {
    return this.voteService.findAll(roundId);
  }

  @Patch(':id')
  update(
    @Param('id') roundId: string,
    @Body('value') value: string,
    @Body('id') id: string,
    @Req() req: Request,
  ) {
    return this.voteService.update(roundId, req, +value, id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.voteService.remove(+id);
  // }
}
