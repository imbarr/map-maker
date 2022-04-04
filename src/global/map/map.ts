import { Marker } from './marker'

export class Map {
  image: HTMLImageElement
  markers: Marker[]

  constructor(image: HTMLImageElement, markers: Marker[]) {
    if (markers === undefined) {
      markers = []
    }

    this.image = image
    this.markers = markers
  }
}