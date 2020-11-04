import { Module } from '@nestjs/common'
import { ThingsResolver } from './things.resolver';

@Module({
  providers: [ThingsResolver],
})
export class ThingsModule {}
