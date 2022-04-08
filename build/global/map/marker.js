// @ts-ignore
import { v4 as uuid } from 'uuid';
export class Marker {
  constructor(icon, page, text, coords, tags) {
    this.id = uuid();
    this.page = page;
    this.icon = icon;
    this.text = text;
    this.coords = coords;
    this.tags = [...tags];
  }

  copy(coords) {
    return new Marker(this.icon, this.page, this.text, coords, this.tags);
  }

}