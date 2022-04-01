import { Item } from './item'
import { Canvas } from '../canvas/canvas'
import { Coords, setCoords } from '../util'
import { markerSize } from '../globals'
import { IconsList } from '../icons'

export class Marker implements Item {
  icon: string
  text: string
  coords: Coords

  constructor(icon: string, text:string, coords: Coords) {
    this.icon = icon
    this.text = text
    this.coords = coords
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
