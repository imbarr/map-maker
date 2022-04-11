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
  desc: string
  coords: Coords

  constructor(m: Marker) {
    this.id = m.id
    this.icon = m.icon
    this.text = m.text
    this.desc = m.desc
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
    let text = this.text.replace(/\n/g, `<br>`)

    if (this.desc) {
      text += `<br><br>` + this.desc.replace(/\n/g, `<br>`)
    }

    let template = document.createElement('template')
    template.innerHTML = `<div class="marker">
                            <img src="${image.src}"
                                 data-id="${this.id}"
                                 class="marker-img"
                                 width="${markerSize}px"
                                 height="${markerSize}px"
                                 alt="not found"/>
                            <span class="marker-tooltip">${text}</span>     
                          </div>`
    return template.content.firstChild as HTMLElement
  }
}
