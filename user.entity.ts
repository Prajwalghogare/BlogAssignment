import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
  } from 'typeorm';
  import * as crypto from 'crypto-js';
  import { BlogEntity } from 'src/Blog/blog.entity';
  
  @Entity('User')
  @Unique(['email'])
  export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    email : string;

    @Column()
    password: string;


  
    // one user may have multiple tasks
    @OneToMany((Blog) => BlogEntity, (Blog) => Blog.user, { eager: true })
    blogs: BlogEntity[];
  
    validatePassword(password: string) {
      const encrypted = `${crypto.MD5(password)}`;
      console.log(`encrypted: ${encrypted}, user: ${this.password}`);
      return encrypted == this.password;
    }
  }