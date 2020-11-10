import { Module } from '@nestjs/common'
import { JsonScalar } from './json.scalar'
import { ThingsResolver } from './things.resolver'
import { TradfriService } from './tradfri.service'

@Module({
  providers: [ThingsResolver, TradfriService, JsonScalar],
})
export class ThingsModule {}
