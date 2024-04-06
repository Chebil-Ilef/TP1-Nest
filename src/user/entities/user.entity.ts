/* eslint-disable prettier/prettier */
import { Cv } from '../../cv/entities/cv.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt: Date; // Soft delete column

}