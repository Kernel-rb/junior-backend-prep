import { Body, Controller, Delete, Get, Param, Patch, Post, Query , ParseIntPipe , ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get() // GET => users or /users?status=online
  findAll(@Query('status') role?: 'online' | 'offline' | 'afk') {
    return this.UsersService.findAll(role);
  }

  @Get(':id') // GET => users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.findOne(id);
  }

  @Post() // Post => /users
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.UsersService.create(user);
  }

  @Patch(':id') // Patch => users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userUpdate : UpdateUserDto) {
    return this.UsersService.update(id, userUpdate);
  }

  @Delete(':id') // Delete => users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.UsersService.delete(id);
  }
}
