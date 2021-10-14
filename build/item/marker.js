import { setCoords } from '../util';
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
    let template = document.createElement('template');
    template.innerHTML = `<img class="marker"
                               src="${this.icon}"
                               alt="not found"/>`;
    return template.content.firstChild;
  }

}