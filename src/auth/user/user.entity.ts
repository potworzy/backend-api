import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
//import { Role } from '../../decorators/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true })
  email: string;

  // @Exclude()
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
}
