import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ErrorLog {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ nullable: true })
  requestId: string;

  @Column()
  url: string;

  @Column()
  method: string;

  @Column('text')
  message: string;

  @Column('text', { nullable: true })
  stack: string;

  @CreateDateColumn()
  createdAt: Date;
}
