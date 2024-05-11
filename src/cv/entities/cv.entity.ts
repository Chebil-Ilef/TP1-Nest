/* eslint-disable prettier/prettier */
import { Skill } from '../../skill/entities/skill.entity';
import { User } from '../../auth/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { CvHistory } from 'src/cv-history/entities/cv-history.entity';

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

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.cvs, { eager: true })
  user: User;

  @ManyToMany(() => Skill, null, { eager: true })
  @JoinTable()
  skills: Skill[];

  @OneToMany(() => CvHistory, (cvHistory) => cvHistory.cv, { eager: true })
  cvHistories: CvHistory[];

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt: Date; // Soft delete column
}
