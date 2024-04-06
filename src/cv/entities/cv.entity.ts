/* eslint-disable prettier/prettier */
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, DeleteDateColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.cvs, { eager: true })
  user: User;

  @ManyToMany(() => Skill, null, { eager: true })
  @JoinTable()
  skills: Skill[];

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt: Date; // Soft delete column
}
