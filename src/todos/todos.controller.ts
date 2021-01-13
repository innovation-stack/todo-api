import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    this.todosService.create(body);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() body: any) {
    this.todosService.updateOne(id, body);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string) {
    this.todosService.removeOne(id);
  }
}
