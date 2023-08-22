import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @Transform(({ value }) => value.getTime())
  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  @Transform(({ value }) => value.getTime())
  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt: Date;

  constructor(login: string, password: string) {
    this.id = uuidv4();
    this.login = login;
    this.password = password;
  }
}
