import { Marker } from './marker'
import { Page } from './page'
import { Floor } from './floor'
import { Jump } from './jump'

export class Map {
  markers: Marker[]
  pages: Page[]
  floors: Floor[]
  jumps: Jump[]

  constructor(markers: Marker[], pages: Page[], floors: Floor[], jumps: Jump[]) {
    this.pages = pages
    this.markers = markers
    this.floors = floors
    this.jumps = jumps
  }
}
