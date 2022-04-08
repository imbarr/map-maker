import { Coords, setSize, Size } from '../util'
import { MapItem } from '../item/map-item'
import { global } from './global'
import { MarkerItem } from '../item/marker-item'
import { PageState } from './page-state'

const zoomStep = 1.1
const initSize = {
  width: 800,
  height: 600
}

export class Canvas {
  html: HTMLElement
  map: MapItem

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

  loadMap() {
    let mapItem = new MapItem()
    let page = global.map.pages.find(p => p.name === global.state.selectedPage)
    let markers = global.state.filteredMarkers.filter(m => m.page === global.state.selectedPage)

    markers.forEach(m => mapItem.addMarker(new MarkerItem(m)))

    mapItem.setImage(page.image.src)
    let size = {
      width: page.image.naturalWidth,
      height: page.image.naturalHeight
    }

    this.setMap(mapItem, size)
    this.render()
  }

  setSelectedCoords(mouseX: number, mouseY: number) {
    const rect = this.html.getBoundingClientRect();
    this.selectedCoords = {
      x: (mouseX - rect.left) / this.scale,
      y: (mouseY - rect.top) / this.scale
    }
  }

  setMap(map: MapItem, size: Size) {
    this.map = map
    this.size = size
  }

  zoomIn(event: WheelEvent) {
    this.zoom(event, scale => scale * zoomStep)
  }

  zoomOut(event: WheelEvent) {
    this.zoom(event, scale => scale / zoomStep)
  }

  setState(state: PageState) {
    this.scale = state.scale
    this.render()
    this.html.parentElement.scrollLeft = state.scrollLeft
    this.html.parentElement.scrollTop = state.scrollTop
  }

  private zoom(event: WheelEvent, scaleFunc: (scale: number) => number) {
    let offset = {
      x: this.html.parentElement.offsetLeft,
      y: this.html.parentElement.offsetTop
    }

    let original = {
      x: this.html.parentElement.scrollLeft,
      y: this.html.parentElement.scrollTop
    }

    let location = {
      x: event.pageX - offset.x + original.x,
      y: event.pageY  - offset.y + original.y
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
      x: zoomPointNew.x - event.pageX + offset.x,
      y: zoomPointNew.y - event.pageY + offset.y
    }

    this.html.parentElement.scrollLeft = scrollNew.x
    this.html.parentElement.scrollTop = scrollNew.y

    let pageState = global.state.pageStates.find(s => s.name === global.state.selectedPage)
    pageState.scrollLeft = scrollNew.x
    pageState.scrollTop = scrollNew.y
    pageState.scale = this.scale

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
