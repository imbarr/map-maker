import { Item } from './item'
import { Coords, setCoords } from '../util'
import { Marker } from '../global/map/marker'
import { Canvas } from '../global/canvas'
import { markerSize } from '../global/constants/other'
import { global } from '../global/global'

export class MarkerItem implements Item {
  id: string
  icon: string
  text: string
  coords: Coords

  constructor(m: Marker) {
    this.id = m.id
    this.icon = m.icon
    this.text = m.text
    this.coords = m.coords
  }

  render(canvas: Canvas) {
    let elem = this.getElement()
    setCoords(elem, this.coords, canvas.scale)
    canvas.html.appendChild(elem)
  }

  private getElement(): HTMLElement {
    let image = global.state.icons
      .find(i => i.id === this.icon).image

    let template = document.createElement('template')
    template.innerHTML = `<div class="marker">
                            <img src="${image.src}"
                                 data-id="${this.id}"
                                 class="marker-img"
                                 width="${markerSize}px"
                                 height="${markerSize}px"
                                 alt="not found"/>
                            <span class="marker-tooltip">${this.text}</span>     
                          </div>`
    return template.content.firstChild as HTMLElement
  }
}
