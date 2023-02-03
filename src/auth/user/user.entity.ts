import { BaseEntity } from '../../database/base.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Game } from '../../game/game.entity';
import { Vote } from '../../game/round/vote/vote.entity';
//import { Role } from '../../decorators/roles.enum';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  // @Column({
  //   type: 'enum',
  //   enum: Role,
  //   default: Role.User,
  // })
  // role: Role;

  @Column({ nullable: true })
  refreshToken?: string;

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @OneToMany(() => Game, (game) => game.user)
  games: Game[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];
}
