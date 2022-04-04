import { setCoords } from '../util';
import { markerSize } from '../globals';
import { IconsList } from '../icons';
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
    let file = '/public/icons/' + IconsList[this.icon].file;
    let template = document.createElement('template');
    template.innerHTML = `<div class="marker">
                            <img src="${file}"
                                 width="${markerSize}px"
                                 height="${markerSize}px"
                                 alt="not found"/>
                            <span class="marker-tooltip">${this.text}</span>     
                          </div>`;
    return template.content.firstChild;
  }

}