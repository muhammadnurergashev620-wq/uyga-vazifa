import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './config/db/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommetModule } from './commet/commet.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PrismaModule,
    UserModule,
    PostModule,
    CommetModule,
  ],
})
export class AppModule {}
