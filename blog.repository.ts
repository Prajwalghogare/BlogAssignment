import { SearchBlogDTO } from './dto/search.blog.dto';
import { UserEntity } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBlogDTO } from './dto/create.blog.dto';
import { BlogEntity } from './blog.entity';


@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity> {
  async getBlogs(searchBlogDTo: SearchBlogDTO,user: UserEntity) {
    // get the search parameter and status value
    const { search } = searchBlogDTo;

    // select * from blog where title like '%{search}%' or Content like '%{search}%'

    // create a query builder
    const query = this.createQueryBuilder('blog');


    // search by title, Content and tags
    if (search) {
      query.andWhere(
        `(blog.title LIKE :search) OR (blog.Content LIKE :search)OR (blog.tags LIKE :search)`,
        { search: `%${search}%` },
      );
    }

    // add the user id
    query.andWhere(`blog.userId = :userId`, { userId: user.id });

    // execute the query to get many records
    return await query.getMany();
  }

  // updateblog() {}

  async createBlog(createBlogDto: CreateBlogDTO, user: UserEntity) {
    // create a row in the Blog Table (BlogEntity)
    const blog = new BlogEntity();
    blog.title = createBlogDto.title;
    blog.Contents = createBlogDto.Contents;
    blog.tags = createBlogDto.tags;
    

    // the logged in user will own the blog
    blog.user = user;

    // create a new row in the Blog Table
    await blog.save();

    // delete user property
    delete blog.user;

    return blog;
  }
}
