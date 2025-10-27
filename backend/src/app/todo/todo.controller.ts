import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  @Get()
  async findAll(@Query('search') search?: string) {
    return this.todosService.findAll(search);
  }

  @Post()
  async create(@Body() body: CreateTodoDto) {
    return this.todosService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTodoDto) {
    return this.todosService.update(id, body);
  }
}
