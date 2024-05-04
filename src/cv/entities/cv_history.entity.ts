import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Cv } from './cv.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class CvHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  userId: number;

  @Column()
  cvId: number;

  @ManyToOne(() => Cv, (cv) => cv.cvHistories)
  cv: Cv;

  @ManyToOne(() => User, (user) => user.cvHistories)
  user: User;

  @CreateDateColumn()
  operationDate: Date;
}
