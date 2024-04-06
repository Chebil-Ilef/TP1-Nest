/* eslint-disable prettier/prettier */
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Cv {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: string;

  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne(() => User, user => user.cvs)

  @ManyToOne(() => User, (user) => user.cvs)
  user: User;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];

  
}
