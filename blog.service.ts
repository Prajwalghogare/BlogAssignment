import { BlogModule } from './blog.module';
import { BlogEntity } from 'src/Blog/blog.entity';
import { SearchBlogDTO } from './dto/search.blog.dto';
import { Injectable, NotFoundException, createParamDecorator } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CreateBlogDTO } from './dto/create.blog.dto';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(
    // add the dependency for BlogRepository
    @InjectRepository(BlogRepository)
    private BlogRepository: BlogRepository,
  ) {}

  // return Blogs
  async getBlogs( searchBlogDto: SearchBlogDTO,user: UserEntity) {
    return this.BlogRepository.getBlogs(searchBlogDto,user);
  }

  // create a new blog
  async createBlog(createBlogDto: CreateBlogDTO, user: UserEntity) {
    // get a new row created for the blog
    return this.BlogRepository.createBlog(createBlogDto, user);
  }

  async getblogById(id: string) {
    // select * from Task where id = {id}
    const blog = await this.BlogRepository.findOne(id);
    if (!blog) {
      throw new NotFoundException('blog not found');
    }

    return blog;
  }

  // async update(id: string,createBlogDto:CreateBlogDTO,user: UserEntity):Promise<BlogEntity>{
  //   // find the blog by id
  //   const blog = await this.getblogById(id);
  //   const editedblog = await this.BlogModule;
  //   .findByIdAndUpdate(id,createBlogDto,{new:true});
  //   // save the changes
  //   await blog.save();

  //   return blog;
  // }

  async deleteBlog(id: string) {
    // try deleting the blog with id
    const result = await this.BlogRepository.delete(id);

    // if affected rows are > 0 -> success
    if (result.affected == 0) {
      throw new NotFoundException('blog not found');
    }

    return result;
  }
}
