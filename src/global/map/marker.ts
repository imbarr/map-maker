import { Coords } from '../../util'
// @ts-ignore
import { v4 as uuid } from 'uuid';

export class Marker {
  id: string
  floor: string
  icon: string
  text: string
  desc: string
  coords: Coords
  tags: string[]

  constructor(icon: string, floor: string, text: string, desc: string, coords: Coords, tags: string[]) {
    this.id = uuid()
    this.floor = floor
    this.icon = icon
    this.text = text
    this.desc = desc
    this.coords = coords
    this.tags = [...tags]
  }
}

export function copyMarker(marker: Marker, coords: Coords, floor: string): Marker {
  return new Marker(marker.icon, floor, marker.text, marker.desc, coords, marker.tags)
}
