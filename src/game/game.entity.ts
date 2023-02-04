import { User } from 'src/auth/user/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../database/base.entity';
import { Round } from './round/round.entity';

@Entity()
export class Game extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  finished: boolean;

  @ManyToOne(() => User, (user) => user.games)
  user: User;

  @ManyToOne(() => User, (user) => user.gamesMod)
  moderator: User;

  @OneToMany(() => Round, (round) => round.game)
  rounds: Round[];
}
