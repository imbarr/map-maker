import { Item } from './item'
import { Canvas } from '../canvas/canvas'
import { Coords, setCoords } from '../util'
import { markerSize } from '../globals'
import { IconsList } from '../icons'
import { Marker } from '../map/marker'

export class MarkerItem implements Item {
  icon: string
  text: string
  coords: Coords

  constructor(m: Marker) {
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
    let file = '/public/icons/' + IconsList[this.icon].file

    let template = document.createElement('template')
    template.innerHTML = `<div class="marker">
                            <img src="${file}"
                                 width="${markerSize}px"
                                 height="${markerSize}px"
                                 alt="not found"/>
                            <span class="marker-tooltip">${this.text}</span>     
                          </div>`
    return template.content.firstChild as HTMLElement
  }
}
