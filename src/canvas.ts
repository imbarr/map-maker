const zoomStep = 1.1

class Canvas {
  html: HTMLElement
  map: GameMap

  height: number
  width: number
  scale: number
  prevX: number
  prevY: number

  constructor(html: HTMLElement, map: GameMap) {
    this.html = html
    this.map = map

    this.scale = 1
    this.width = html.offsetWidth
    this.height = html.offsetHeight

    this.addEvents()
  }

  zoomIn(event: WheelEvent) {
    this.zoom(event, scale => scale * zoomStep)
  }

  zoomOut(event: WheelEvent) {
    this.zoom(event, scale => scale / zoomStep)
  }

  setImage(src: string) {
    let size = this.map.setImage(src)

    this.width = size.width
    this.height = size.height
    this.render()
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

    this.html.addEventListener('mousemove', e => {
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
    this.html.addEventListener('wheel', e => {
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

  private render() {
    this.html.style.height = this.height * this.scale + 'px'
    this.html.style.width = this.width * this.scale + 'px'
    this.map.render()
  }
}
