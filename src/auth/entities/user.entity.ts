/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { UserRoleEnum } from '../../enums/user-role.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CvHistory } from 'src/cv/entities/cv_history.entity';

@Entity('AuthUser')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt?: string;

  @OneToMany(() => CvHistory, (cvHistory) => cvHistory.user, { eager: true })
  cvHistories: CvHistory[];
}
