// @ts-ignore
import { v4 as uuid } from 'uuid';
export class Jump {
  constructor(coords, icon, floorFrom, floorTo) {
    this.id = uuid();
    this.coords = coords;
    this.icon = icon;
    this.floorFrom = floorFrom;
    this.floorTo = floorTo;
  }

}