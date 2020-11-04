import { Module } from '@nestjs/common'
import { ThingsResolver } from './things.resolver'
import { TradfriService } from './tradfri.service'

@Module({
  providers: [ThingsResolver, TradfriService],
})
export class ThingsModule {}
