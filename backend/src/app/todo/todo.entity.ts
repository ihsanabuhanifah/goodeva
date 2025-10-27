import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TodoStatus {
  CREATED = 'created',
  ON_GOING = 'on_going',
  COMPLETED = 'completed',
  PROBLEM = 'problem',
}

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.CREATED,
  })
  status: TodoStatus;

  @Column({ type: 'text', nullable: true })
  problem_desc?: string | null;

  @Column({ type: 'text', nullable: true })
  ai_recommendation ?: string | null;

  

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
