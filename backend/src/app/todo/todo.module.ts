import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';
import { AiModule } from '../ai/ai.module';


@Module({
imports: [TypeOrmModule.forFeature([Todo]), AiModule],
controllers: [TodoController],
providers: [TodoService],
})
export class TodoModule {}