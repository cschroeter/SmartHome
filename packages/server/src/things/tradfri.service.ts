import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Accessory, AccessoryTypes, Light, TradfriClient } from 'node-tradfri-client'
import { Thing } from './thing.model'

@Injectable()
export class TradfriService implements OnModuleInit, OnModuleDestroy {
  private client: TradfriClient
  private lightbulbs = {}

  async onModuleInit() {
    try {
      this.client = new TradfriClient('192.168.178.22', { watchConnection: true })
      const { identity, psk } = await this.client.authenticate('zyqPT8SuWAYwRCTA')
      await this.client.connect(identity, psk)
      this.handleDeviceUpdated = this.handleDeviceUpdated.bind(this)
      this.client.on('device updated', this.handleDeviceUpdated).observeDevices()
    } catch (e) {
      console.log(e)
    }
  }

  onModuleDestroy() {
    this.client.destroy()
  }

  handleDeviceUpdated(device: Accessory) {
    console.log('Device updated', device.instanceId)
    if (device.type === AccessoryTypes.lightbulb) {
      this.lightbulbs = { ...this.lightbulbs, [device.instanceId]: device }
    }
  }

  getThings(): Thing[] {
    const things = Object.values(this.client.devices).reduce((prev, curr) => [...prev, curr], [])
    return things.map((thing) =>
      Object.assign(thing, {
        id: thing.instanceId,
        on: thing.lightList?.[0].onOff,
        brightness: thing.lightList?.[0].dimmer,
      }),
    )
  }

  toggle(id: number) {
    console.log('toggle light', this.lightbulbs[id].lightList[0])
    const light = this.lightbulbs[id].lightList[0]
    const lightOn = light.onOff
    light.toggle()
    return Object.assign(this.client.devices[id], { id: id, on: !lightOn })
  }

  async setBrightness(id: number, brightness: number) {
    const light: Light = this.lightbulbs[id].lightList[0]
    await light.setBrightness(brightness)
    return Object.assign(this.client.devices[id], { id: id, brightness })
  }
}
