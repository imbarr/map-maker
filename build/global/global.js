import { Canvas } from './canvas';
import { State } from './state';
import { onMarkersEdited } from '../interface/common';

class Global {
  constructor() {
    let html = document.getElementById('canvas');
    this.canvas = new Canvas(html);
    this.state = new State();
  }

  setMap(map) {
    this.map = map;
    global.state.tags = [];
    global.state.selectedTags = [];
    map.markers.forEach(m => global.state.addNewTags(m.tags));
    onMarkersEdited();
    this.canvas.loadMap();
  }

}

export const global = new Global();