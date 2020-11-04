import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ThingsModule } from './things/things.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: (join(process.cwd()), 'src/schema.gql'),
    }),
    ThingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
