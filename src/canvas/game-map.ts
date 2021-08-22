class GameMap {
  image: string
  markers: Marker[]

  constructor() {
    this.markers = []
  }

  setImage(image: string): Size {
    this.image = image

    let elem = this.getElement()
    let imgElem = elem as HTMLImageElement

    return {
      width: 2951,
      height: 2390
    }
  }

  addMarker(marker: Marker) {
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
