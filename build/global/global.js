import { Canvas } from './canvas';
import { State } from './state';
import { onMarkersEdited } from '../interface/common';
import { populatePageList } from '../interface/page';

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
    global.state.selectedPage = map.pages[0].id;
    map.markers.forEach(m => global.state.addNewTags(m.tags));
    onMarkersEdited();
    populatePageList();
    this.canvas.loadMap();
  }

}

export const global = new Global();