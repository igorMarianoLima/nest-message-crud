import { IsEmail } from 'class-validator';
import { Message } from 'src/message/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    length: 255,
  })
  passwordHash: string;

  @Column({
    length: 100,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Message, (m) => m.from)
  sendedMessages: Message[];

  @OneToMany(() => Message, (m) => m.to)
  receivedMessages: Message[];

  @Column({ default: true })
  isActive: boolean;
}
