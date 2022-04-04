import { Canvas } from './canvas'
import { State } from './state'
import { Map } from './map/map'
import { search } from '../interface/search'

class Global {
  canvas: Canvas
  state: State
  map: Map

  markerSize = 20

  constructor() {
    let html = document.getElementById('canvas')
    this.canvas = new Canvas(html)
    this.state = new State()
  }

  setMap(map: Map) {
    this.map = map
    search('')
    this.canvas.loadMap()
  }
}

export const global = new Global()
