import { Coords, setSize, Size } from '../util'
import { GameMap } from '../item/game-map'

const zoomStep = 1.1
const initSize = {
  width: 800,
  height: 600
}

export class Canvas {
  html: HTMLElement
  map: GameMap

  size: Size
  scale: number
  prevX: number
  prevY: number
  selectedCoords: Coords

  constructor(html: HTMLElement) {
    this.html = html

    this.scale = 1
    this.size = initSize

    this.addEvents()
  }

  setImage(img: HTMLImageElement) {
    let gameMap = new GameMap()
    gameMap.setImage(img.src)
    let size = {
      width: img.naturalWidth,
      height: img.naturalHeight
    }

    this.setMap(gameMap, size)
  }

  setSelectedCoords(mouseX: number, mouseY: number) {
    const rect = this.html.getBoundingClientRect();
    this.selectedCoords = {
      x: (mouseX - rect.left) / this.scale,
      y: (mouseY - rect.top) / this.scale
    }
  }

  setMap(map: GameMap, size: Size) {
    this.map = map
    this.size = size
  }

  zoomIn(event: WheelEvent) {
    this.zoom(event, scale => scale * zoomStep)
  }

  zoomOut(event: WheelEvent) {
    this.zoom(event, scale => scale / zoomStep)
  }

  private zoom(event: WheelEvent, scaleFunc: (scale: number) => number) {
    let original = {
      x: this.html.parentElement.scrollLeft,
      y: this.html.parentElement.scrollTop
    }

    let location = {
      x: event.pageX + original.x,
      y: event.pageY + original.y
    }

    let zoomPoint = {
      x: location.x / this.scale,
      y: location.y / this.scale
    }

    this.scale = scaleFunc(this.scale)

    let zoomPointNew = {
      x: zoomPoint.x * this.scale,
      y: zoomPoint.y * this.scale
    }

    let scrollNew = {
      x: zoomPointNew.x - event.pageX,
      y: zoomPointNew.y - event.pageY
    }

    this.html.parentElement.scrollLeft = scrollNew.x
    this.html.parentElement.scrollTop = scrollNew.y
    this.render()
  }

  private addEvents() {
    // Dragging
    this.html.addEventListener('mousedown', e => {
      e.preventDefault()
      this.prevX = e.pageX
      this.prevY = e.pageY
    })

    this.html.parentElement.addEventListener('mousemove', e => {
      if (e.buttons) {
        e.preventDefault()
        let drag = {
          x: this.prevX - e.pageX,
          y: this.prevY - e.pageY
        }

        this.prevX = e.pageX
        this.prevY = e.pageY

        if (drag.x != 0 || drag.y != 0) {
          this.html.parentElement.scrollBy(drag.x, drag.y)
        }
      }
    })

    // Zoom in/out
    this.html.parentElement.addEventListener('wheel', e => {
      let event = e as WheelEvent
      if (event.ctrlKey) {
        event.preventDefault()
        if (event.deltaY < 0) {
          this.zoomIn(event)
        } else {
          this.zoomOut(event)
        }
      }
    })
  }

  render() {
    this.html.innerHTML = ''
    setSize(this.html, this.size, this.scale)
    if (this.map) {
      this.map.render(this)
    }
  }
}
