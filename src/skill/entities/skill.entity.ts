/* eslint-disable prettier/prettier */
import { Cv } from '../../cv/entities/cv.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @ManyToMany(() => Cv, (cv) => cv.skills)
  cvs: Cv[];

}
