import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { BlogService } from './blog.service';

@Module({
  // use typeorm to create the table Blog using repository
  imports: [TypeOrmModule.forFeature([BlogRepository]), UserModule],

  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
