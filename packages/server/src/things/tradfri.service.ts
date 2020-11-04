import { Injectable, OnModuleInit } from '@nestjs/common'
import { Accessory, AccessoryTypes, discoverGateway, TradfriClient } from 'node-tradfri-client'
import { Thing } from './thing.model'

@Injectable()
export class TradfriService implements OnModuleInit {
  private client: TradfriClient
  private lightbulbs = {}

  async onModuleInit() {
    const { host } = await discoverGateway()
    this.client = new TradfriClient(host)
    const { identity, psk } = await this.client.authenticate('zyqPT8SuWAYwRCTA')
    await this.client.connect(identity, psk)

    this.handleDeviceUpdated = this.handleDeviceUpdated.bind(this)
    this.client.on('device updated', this.handleDeviceUpdated).observeDevices()
  }

  handleDeviceUpdated(device: Accessory) {
    if (device.type === AccessoryTypes.lightbulb) {
      this.lightbulbs = { ...this.lightbulbs, [device.instanceId]: device }
    }
  }

  getThings(): Thing[] {
    return Object.values(this.client.devices).reduce((prev, curr) => [...prev, curr], [])
  }

  toggle(instanceId: number) {
    const light = this.lightbulbs[instanceId].lightList[0]
    light.toggle()
    return this.client.devices[instanceId]
  }
}
