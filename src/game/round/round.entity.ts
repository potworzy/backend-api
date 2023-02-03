import { BaseEntity } from '../../database/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Vote } from './vote/vote.entity';

@Entity()
export class Round extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Vote, (vote) => vote.round)
  votes: Vote[];
}
