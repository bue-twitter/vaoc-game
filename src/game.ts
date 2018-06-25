/// <reference path="./util/import.d.ts" />
import * as PIXI from 'pixi.js'
import loader from './util/loader'

export class Game {
  public readonly app: PIXI.Application

  constructor(container: HTMLDivElement, width: number, height: number, property?: object) {
    const prop = Object.assign({ width, height, autoStart: false }, property)
    this.app = new PIXI.Application(prop)
    this.app.stage = new PIXI.display.Stage()
    container.appendChild(this.app.view)
  }

  public start() {
    this.init().then(() => {
      this.app.start()
    })
  }

  public stop(): void {
    this.app.stop()
  }

  public resume(): void {
    this.app.start()
  }

  private async init() {
    this.app.stage = new PIXI.display.Stage()

    const m1 = require('@/asset/image/m1.png')
    const m2 = require('@/asset/image/m2.png')

    const containerA = new PIXI.Container()
    const containerB = new PIXI.Container()
    const groupA = new PIXI.display.Group(2, true)
    const groupB = new PIXI.display.Group(2, true)
    console.log(groupA, groupB)

    const sprites = await loader.load([m1, m2])

    const sp1: PIXI.Sprite = sprites[m1]
    const sp1s = []
    const sp2s = []
    for (let i = 0; i < 10; i++) {
      sp1s[i] = loader.copyTexture(sp1)
      sp1s[i].position.set(i * 20, i * 10)
      sp1s[i].scale.set(0.2, 0.2)
      sp1s[i].zOrder = -i
      containerA.addChild(sp1s[i])
      sp1s[i].parentGroup = groupA
    }
    const sp2: PIXI.Sprite = sprites[m2]
    for (let i = 0; i < 10; i++) {
      sp2s[i] = loader.copyTexture(sp2)
      sp2s[i].position.set((i + 10) * 18,  200 - i * 12)
      sp2s[i].scale.set(0.2, 0.2)
      sp2s[i].zOrder = i
      containerB.addChild(sp2s[i])
      sp2s[i].parentGroup = groupB
    }

    containerA.position.set(60, 60)

    this.app.stage.addChild(containerA)
    this.app.stage.addChild(containerB)
    const stage = this.app.stage as any
    stage.group.enableSort = true

    const LayerA = new PIXI.display.Layer(groupA)
    const LayerB = new PIXI.display.Layer(groupB)
    LayerA.group.enableSort = true
    LayerB.group.enableSort = true
    this.app.stage.addChild(LayerA)
    this.app.stage.addChild(LayerB)
  }
}
