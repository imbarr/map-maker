import { MarkerItem } from './marker-item'
import { Item } from './item'
import { Canvas } from '../global/canvas'

export class MapItem implements Item {
  image: string
  items: Item[]

  constructor() {
    this.items = []
  }

  setImage(image: string) {
    this.image = image
  }

  addItem(item: Item) {
    this.items.push(item)
  }

  render(canvas: Canvas) {
    let elem = this.getElement()
    canvas.html.appendChild(elem)

    this.items.forEach(marker => marker.render(canvas))
  }

  private getElement(): HTMLElement {
    let template = document.createElement('template')
    template.innerHTML = `<img class="background-image"
                               src="${this.image}"
                               alt="not found"/>`
    return template.content.firstChild as HTMLElement
  }
}
