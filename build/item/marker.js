import { setCoords } from '../util';
import { markerSize } from '../globals';
import { IconsList } from '../icons';
export class Marker {
  constructor(icon, coords) {
    this.icon = icon;
    this.coords = coords;
  }

  render(canvas) {
    let elem = this.getElement();
    setCoords(elem, this.coords, canvas.scale);
    canvas.html.appendChild(elem);
  }

  getElement() {
    let file = '/public/icons/' + IconsList[this.icon].file;
    let template = document.createElement('template');
    template.innerHTML = `<img class="marker"
                               src="${file}"
                               width="${markerSize}px"
                               height="${markerSize}px"
                               alt="not found"/>`;
    return template.content.firstChild;
  }

}