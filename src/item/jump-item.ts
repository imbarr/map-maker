import { Item } from './item'
import { Jump } from '../global/map/jump'
import { global } from '../global/global'
import { JumpIcons } from '../global/constants/jump-icons'
import { markerSize } from '../global/constants/other'
import { Canvas } from '../global/canvas'
import { Coords, setCoords } from '../util'
import { selectFloor } from '../interface/floor'

export class JumpItem implements Item {
  id: string
  icon: string
  coords: Coords
  floorTo: string

  constructor(j: Jump) {
    this.id = j.id
    this.icon = j.icon
    this.coords = j.coords
    this.floorTo = j.floorTo
  }

  render(canvas: Canvas) {
    let elem = this.getElement()
    setCoords(elem, this.coords, canvas.scale)
    elem.addEventListener('click', () => {
      global.state.selectedFloor = this.floorTo
      selectFloor(this.floorTo)
      global.canvas.loadMap()
    })
    canvas.html.appendChild(elem)
  }

  private getElement(): HTMLElement {
    let template = document.createElement('template')
    let image = JumpIcons.find(i => i.id === this.icon).image

    template.innerHTML = `<img src="${image.src}"
                               data-jump="${this.id}"
                               class="jump-img"
                               width="${markerSize}px"
                               height="${markerSize}px"
                               alt="not found"/>`

    return template.content.firstChild as HTMLElement
  }
}
