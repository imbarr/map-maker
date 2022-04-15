import { Marker } from './marker'
import { Page } from './page'
import { Floor } from './floor'

export class Map {
  markers: Marker[]
  pages: Page[]

  constructor(markers: Marker[], pages: Page[]) {
    this.pages = pages
    this.markers = markers
  }

  getAllFloors(): Floor[] {
    return this.pages.flatMap(p => p.floors)
  }
}