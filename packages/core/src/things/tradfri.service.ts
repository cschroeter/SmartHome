import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Accessory, AccessoryTypes, TradfriClient } from 'node-tradfri-client'
import { BooleanValue, Capability, NumberValue, Property, Thing } from './thing.model'
import { Builder } from 'builder-pattern'
import { SetPropertyInput } from './things.resolver'

interface Dictonary<T> {
  [id: number]: T
}

@Injectable()
export class TradfriService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TradfriService.name)
  private client: TradfriClient
  private devices: Dictonary<Accessory> = {}
  private things: Dictonary<Thing> = {}

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
    this.logger.log(`${device.name} [${device.instanceId}] was updated`)
    this.devices = { ...this.devices, [device.instanceId]: device }

    if (device.type === AccessoryTypes.lightbulb) {
      const brightness = Builder<NumberValue>()
        .max(100)
        .min(0)
        .value(device.lightList[0].dimmer)
        .build()

      const on = Builder<BooleanValue>().value(device.lightList[0].onOff).build()
      const thing = Builder<Thing>()
        .id(device.instanceId)
        .title(device.name)
        .capabilities([Capability.Light])
        .properties({ brightness, on })
        .build()
      this.things = { ...this.things, [device.instanceId]: thing }
    }
  }

  getThings(): Thing[] {
    return Object.values(this.things).reduce((prev, curr) => [...prev, curr], [])
  }

  getThing(id: number): Thing {
    return this.things[id]
  }

  async setProperty(setPropertyInput: SetPropertyInput): Promise<Thing> {
    const { id, value, property } = setPropertyInput
    const light = this.devices[id].lightList[0]
    let thing = this.getThing(id)

    switch (property) {
      case Property.OnOff:
        await light.toggle(value)
        thing.properties.on.value = value
        return thing
      case Property.Brightness:
        await light.setBrightness(value)
        thing.properties.brightness.value = value
        return thing
      default:
        console.log('not supported')
    }
    return thing
  }
}
