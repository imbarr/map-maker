import { Coords } from '../../util'
// @ts-ignore
import { v4 as uuid } from 'uuid';

export class Jump {
  id: string
  coords: Coords
  icon: string
  floorFrom: string
  floorTo: string

  constructor(coords: Coords, icon: string, floorFrom: string, floorTo: string) {
    this.id = uuid()
    this.coords = coords
    this.icon = icon
    this.floorFrom = floorFrom
    this.floorTo = floorTo
  }
}