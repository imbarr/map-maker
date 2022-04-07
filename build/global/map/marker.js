// @ts-ignore
import { v4 as uuid } from 'uuid';
export class Marker {
  constructor(icon, text, coords, tags) {
    this.id = uuid();
    this.icon = icon;
    this.text = text;
    this.coords = coords;
    this.tags = [...tags];
  }

  copy(coords) {
    return new Marker(this.icon, this.text, coords, this.tags);
  }

}