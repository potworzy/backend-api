import { User } from 'src/auth/user/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../database/base.entity';

@Entity()
export class Game extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  descripton: string;

  @Column()
  ownerId: number;

  @Column({ nullable: true })
  moderatorId: number;

  @Column({ default: false })
  finished: boolean;

  @ManyToOne(() => User, (user) => user.games)
  user: User;
}
