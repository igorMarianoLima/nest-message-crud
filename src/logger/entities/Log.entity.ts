import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid' })
  requestId: string;

  @Column()
  ip: string;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  payload?: string;

  @Column()
  status: number;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: Date;
}
