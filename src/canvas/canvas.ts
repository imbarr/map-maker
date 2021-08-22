import { Item } from "../item/item"
import { setSize, Size } from '../util'

const zoomStep = 1.1
const initSize = {
  width: 800,
  height: 600
}

export class Canvas {
  html: HTMLElement
  map: Item

  size: Size
  scale: number
  prevX: number
  prevY: number

  constructor(html: HTMLElement) {
    this.html = html

    this.scale = 1
    this.size = initSize

    this.addEvents()
  }

  setMap(map: Item, size: Size) {
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
