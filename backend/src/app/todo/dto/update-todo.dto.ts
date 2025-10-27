import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { TodoStatus } from '../todo.entity';
import { CreateTodoDto } from './create-todo.dto';
export class UpdateTodoDto extends CreateTodoDto {
  @IsOptional()
  id: string;
  @IsOptional()
  @IsEnum(TodoStatus, {
    message: 'status must be one of: created, on_going, completed, or problem',
  })
  status?: TodoStatus;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  problem_desc?: string | null;
}
