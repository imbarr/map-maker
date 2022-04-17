import { setSize } from '../util';
import { MapItem } from '../item/map-item';
import { global } from './global';
import { MarkerItem } from '../item/marker-item';
import { JumpItem } from '../item/jump-item';
const zoomStep = 1.1;
const initSize = {
  width: 800,
  height: 600
};
export class Canvas {
  constructor(html) {
    this.html = html;
    this.scale = 1;
    this.size = initSize;
    this.addEvents();
  }

  loadMap() {
    let mapItem = new MapItem();
    let floor = global.map.floors.find(f => f.id === global.state.selectedFloor);
    let markers = global.state.filteredMarkers.filter(m => m.floor === global.state.selectedFloor);
    let jumps = global.map.jumps.filter(m => m.floorFrom === global.state.selectedFloor);
    markers.forEach(m => mapItem.addItem(new MarkerItem(m)));
    jumps.forEach(j => mapItem.addItem(new JumpItem(j)));
    mapItem.setImage(floor.image.src);
    let size = {
      width: floor.image.naturalWidth,
      height: floor.image.naturalHeight
    };
    this.setMap(mapItem, size);
    this.render();
  }

  setSelectedCoords(mouseX, mouseY) {
    const rect = this.html.getBoundingClientRect();
    this.selectedCoords = {
      x: (mouseX - rect.left) / this.scale,
      y: (mouseY - rect.top) / this.scale
    };
  }

  setMap(map, size) {
    this.map = map;
    this.size = size;
  }

  zoomIn(event) {
    this.zoom(event, scale => scale * zoomStep);
  }

  zoomOut(event) {
    this.zoom(event, scale => scale / zoomStep);
  }

  setState(state) {
    this.scale = state.scale;
    this.render();
    this.html.parentElement.scrollLeft = state.scrollLeft;
    this.html.parentElement.scrollTop = state.scrollTop;
  }

  zoom(event, scaleFunc) {
    let offset = {
      x: this.html.parentElement.offsetLeft,
      y: this.html.parentElement.offsetTop
    };
    let original = {
      x: this.html.parentElement.scrollLeft,
      y: this.html.parentElement.scrollTop
    };
    let location = {
      x: event.pageX - offset.x + original.x,
      y: event.pageY - offset.y + original.y
    };
    let zoomPoint = {
      x: location.x / this.scale,
      y: location.y / this.scale
    };
    this.scale = scaleFunc(this.scale);
    let zoomPointNew = {
      x: zoomPoint.x * this.scale,
      y: zoomPoint.y * this.scale
    };
    let scrollNew = {
      x: zoomPointNew.x - event.pageX + offset.x,
      y: zoomPointNew.y - event.pageY + offset.y
    };
    this.html.parentElement.scrollLeft = scrollNew.x;
    this.html.parentElement.scrollTop = scrollNew.y;
    let pageState = global.state.pageStates.find(s => s.id === global.state.selectedPage);
    pageState.scrollLeft = scrollNew.x;
    pageState.scrollTop = scrollNew.y;
    pageState.scale = this.scale;
    this.render();
  }

  addEvents() {
    // Dragging
    this.html.addEventListener('mousedown', e => {
      e.preventDefault();
      this.prevX = e.pageX;
      this.prevY = e.pageY;
    });
    this.html.parentElement.addEventListener('mousemove', e => {
      if (e.buttons) {
        e.preventDefault();
        let drag = {
          x: this.prevX - e.pageX,
          y: this.prevY - e.pageY
        };
        this.prevX = e.pageX;
        this.prevY = e.pageY;

        if (drag.x != 0 || drag.y != 0) {
          this.html.parentElement.scrollBy(drag.x, drag.y);
        }
      }
    }); // Zoom in/out

    this.html.parentElement.addEventListener('wheel', e => {
      let event = e;

      if (event.ctrlKey) {
        event.preventDefault();

        if (event.deltaY < 0) {
          this.zoomIn(event);
        } else {
          this.zoomOut(event);
        }
      }
    });
  }

  render() {
    this.html.innerHTML = '';
    setSize(this.html, this.size, this.scale);

    if (this.map) {
      this.map.render(this);
    }
  }

}