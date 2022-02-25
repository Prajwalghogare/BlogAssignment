import { BlogEntity } from './blog.entity';
import { SearchBlogDTO } from './dto/search.blog.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get.user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { CreateBlogDTO} from './dto/create.blog.dto';
import { BlogService } from './blog.service';
import { query } from 'express';

@Controller('blog')
@UseGuards(AuthGuard())
export class BlogController {
  // dependency injection
  // BlogController is dependent on BlogService
  constructor(private blogService: BlogService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @GetUser() user: UserEntity,
    @Body() createBlogDTo: CreateBlogDTO,
  ) {
    // 1. create a new task
    // 2. return all tasks
    return this.blogService.createBlog(createBlogDTo, user);
  }

  @Get()
  getBlogs(@GetUser() user: UserEntity,@Query() searchBlogDto: SearchBlogDTO) {
    return this.blogService.getBlogs(searchBlogDto,user);
  }

  // @Put('/:id')
  // update(
  //   @GetUser() user: UserEntity,
  //   @Param('id')id: string,
  //   @Body() createBlogDto: CreateBlogDTO
  //   )
  //   {
  //   return this.blogService.update(id,createBlogDto);
  // }

  // @Delete('/:id')
  // deleteBlog(@GetUser() user: UserEntity, @Param('id') id: string) {
  //   return this.blogService.deleteBlog(id);
  // }
}
