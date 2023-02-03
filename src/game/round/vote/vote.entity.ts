import { User } from '../../../auth/user/user.entity';
import { BaseEntity } from '../../../database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Round } from '../round.entity';

@Entity()
export class Vote extends BaseEntity {
  @Column({ nullable: true })
  value: number;

  @ManyToOne(() => Round, (round) => round.votes)
  round: Round;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;
}
