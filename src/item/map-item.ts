import { MarkerItem } from './marker-item'
import { Item } from './item'
import { Canvas } from '../global/canvas'

export class MapItem implements Item {
  image: string
  markers: MarkerItem[]

  constructor() {
    this.markers = []
  }

  setImage(image: string) {
    this.image = image
  }

  addMarker(marker: MarkerItem) {
    this.markers.push(marker)
  }

  render(canvas: Canvas) {
    let elem = this.getElement()
    canvas.html.appendChild(elem)

    this.markers.forEach(marker => marker.render(canvas))
  }

  private getElement(): HTMLElement {
    let template = document.createElement('template')
    template.innerHTML = `<img class="background-image"
                               src="${this.image}"
                               alt="not found"/>`
    return template.content.firstChild as HTMLElement
  }
}
