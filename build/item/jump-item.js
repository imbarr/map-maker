import { global } from '../global/global';
import { JumpIcons } from '../global/constants/jump-icons';
import { markerSize } from '../global/constants/other';
import { setCoords } from '../util';
import { selectFloor } from '../interface/floor';
export class JumpItem {
  constructor(j) {
    this.id = j.id;
    this.icon = j.icon;
    this.coords = j.coords;
    this.floorTo = j.floorTo;
  }

  render(canvas) {
    let elem = this.getElement();
    setCoords(elem, this.coords, canvas.scale);
    elem.addEventListener('click', () => {
      global.state.selectedFloor = this.floorTo;
      selectFloor(this.floorTo);
      global.canvas.loadMap();
    });
    canvas.html.appendChild(elem);
  }

  getElement() {
    let template = document.createElement('template');
    let image = JumpIcons.find(i => i.id === this.icon).image;
    template.innerHTML = `<img src="${image.src}"
                               data-jump="${this.id}"
                               class="jump-img"
                               width="${markerSize}px"
                               height="${markerSize}px"
                               alt="not found"/>`;
    return template.content.firstChild;
  }

}