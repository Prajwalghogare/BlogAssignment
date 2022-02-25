import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// configuration for DB connectivity
export const TypeORMConfiguration: TypeOrmModuleOptions = {
    "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "Swappy@12",
  "database": "MyBlogs",
  "entities": [__dirname+"/../**/*.entity.{ts,js}"],
  // true: all the properties in the entity classes will be synchronized with database
  "synchronize": false,
}