import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Person)
  @JoinColumn()
  from: Person;

  @ManyToOne(() => Person)
  @JoinColumn()
  to: Person;

  @Column()
  content: string;

  @Column({
    default: false,
  })
  wasRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
