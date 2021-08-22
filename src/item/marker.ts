import { Item } from './item'
import { Canvas } from '../canvas/canvas'
import { Coords, setCoords } from '../util'

export class Marker implements Item {
  icon: string
  coords: Coords

  constructor(icon: string, coords: Coords) {
    this.icon = icon
    this.coords = coords
  }

  render(canvas: Canvas) {
    let elem = this.getElement()
    setCoords(elem, this.coords, canvas.scale)
    canvas.html.appendChild(elem)
  }

  private getElement(): HTMLElement {
    let template = document.createElement('template')
    template.innerHTML = `<img class="marker"
                               src="${this.icon}"
                               alt="not found"/>`
    return template.content.firstChild as HTMLElement
  }
}
