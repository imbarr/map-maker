import { setCoords } from '../util';
import { markerSize } from '../global/constants/other';
import { global } from '../global/global';
export class MarkerItem {
  constructor(m) {
    this.icon = m.icon;
    this.text = m.text;
    this.coords = m.coords;
  }

  render(canvas) {
    let elem = this.getElement();
    setCoords(elem, this.coords, canvas.scale);
    canvas.html.appendChild(elem);
  }

  getElement() {
    let image = global.state.icons.find(i => i.id === this.icon).image;
    let template = document.createElement('template');
    template.innerHTML = `<div class="marker">
                            <img src="${image.src}"
                                 width="${markerSize}px"
                                 height="${markerSize}px"
                                 alt="not found"/>
                            <span class="marker-tooltip">${this.text}</span>     
                          </div>`;
    return template.content.firstChild;
  }

}