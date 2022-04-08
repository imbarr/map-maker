import { Marker } from './marker'
import { Page } from './page'

export class Map {
  markers: Marker[]
  pages: Page[]

  constructor(markers: Marker[], pages: Page[]) {
    this.pages = pages
    this.markers = markers
  }
}