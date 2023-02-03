import { BaseEntity } from '../../database/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Vote } from './vote/vote.entity';
import { Game } from '../game.entity';

@Entity()
export class Round extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  finished: boolean;

  @OneToMany(() => Vote, (vote) => vote.round)
  votes: Vote[];

  @ManyToOne(() => Game, (game) => game.rounds)
  game: Game;
}
