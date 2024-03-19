import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // /users
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // /GET /users or /user?role=value
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }

  // /GET /users/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // /POST /users
  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // /PATCH /users/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  //DELETE /users/:id
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
