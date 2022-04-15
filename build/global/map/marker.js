// @ts-ignore
import { v4 as uuid } from 'uuid';
export class Marker {
  constructor(icon, floor, text, desc, coords, tags) {
    this.id = uuid();
    this.floor = floor;
    this.icon = icon;
    this.text = text;
    this.desc = desc;
    this.coords = coords;
    this.tags = [...tags];
  }

}
export function copyMarker(marker, coords) {
  return new Marker(marker.icon, marker.floor, marker.text, marker.desc, coords, marker.tags);
}