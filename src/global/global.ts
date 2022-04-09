import { Canvas } from './canvas'
import { State } from './state'
import { Map } from './map/map'
import { onMarkersEdited, onSetMap } from '../interface/common'
import { populatePageList } from '../interface/page'

class Global {
  canvas: Canvas
  state: State
  map: Map

  constructor() {
    let html = document.getElementById('canvas')
    this.canvas = new Canvas(html)
    this.state = new State()
  }

  setMap(map: Map) {
    this.map = map
    onSetMap()
  }
}

export const global = new Global()
