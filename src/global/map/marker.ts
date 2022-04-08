import { Coords } from '../../util'
// @ts-ignore
import { v4 as uuid } from 'uuid';

export class Marker {
  id: string
  page: string
  icon: string
  text: string
  coords: Coords
  tags: string[]

  constructor(icon: string, page: string, text: string, coords: Coords, tags: string[]) {
    this.id = uuid()
    this.page = page
    this.icon = icon
    this.text = text
    this.coords = coords
    this.tags = [...tags]
  }

  copy(coords: Coords): Marker {
    return new Marker(this.icon, this.text, coords, this.tags)
  }
}
