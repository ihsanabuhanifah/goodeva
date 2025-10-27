import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ResponseSuccess } from 'src/utils/response';
import { AiService } from '../ai/ai.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly repo: Repository<Todo>,
    private readonly aiService: AiService,
  ) {}

  async create(createDto: CreateTodoDto): Promise<ResponseSuccess> {
    try {
      const todo = this.repo.create({ ...createDto });
      const data = await this.repo.save(todo);

      return {
        status: 'Success',
        data: data,
      };
    } catch {
      throw new HttpException('Ada kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(search?: string): Promise<ResponseSuccess> {
    const filterQuery: any = {};

    if (search) {
      filterQuery.title = ILike(`%${search}%`);
    }
    const data = await this.repo.find({
      where: filterQuery,
    });

    return {
      status: 'Success',
      data: data,
    };
  }

  async findOne(id: string) {
    const t = await this.repo.findOneBy({ id });
    if (!t) throw new NotFoundException('Todo not found');
    return t;
  }

  async update(id: string, updateDto: UpdateTodoDto): Promise<ResponseSuccess> {
    let aiRecommendation = '';
    if (updateDto.problem_desc) {
      aiRecommendation = await this.aiService.getRecommendation(
        updateDto.problem_desc,
      );
    }


    const merged = { ...updateDto, ai_recommendation: aiRecommendation, id };

    const data = await this.repo.save(merged);
    return {
      status: 'Success',
      data: data,
    };
  }

  async remove(id: string) {
    const todo = await this.findOne(id);
    return this.repo.remove(todo);
  }
}
