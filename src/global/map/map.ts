import { Marker } from './marker'
import { Page } from './page'
import { Floor } from './floor'

export class Map {
  markers: Marker[]
  pages: Page[]
  floors: Floor[]

  constructor(markers: Marker[], pages: Page[], floors: Floor[]) {
    this.pages = pages
    this.markers = markers
    this.floors = floors
  }
}
