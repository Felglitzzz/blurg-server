import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './users/user.module';

const modules = [AuthModule, UserModule, BlogModule];

const providers = [
  {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },
];

@Module({
  imports: [
    ...modules,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
      include: [...modules],
    }),
  ],
  providers,
})
export class AppModule {}
