import { Coords } from '../../util'

export class Marker {
  icon: string
  text: string
  coords: Coords

  constructor(icon: string, text: string, coords: Coords) {
    this.icon = icon
    this.text = text
    this.coords = coords
  }
}