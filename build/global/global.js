import { Canvas } from './canvas';
import { State } from './state';
import { search } from '../interface/search';

class Global {
  constructor() {
    let html = document.getElementById('canvas');
    this.canvas = new Canvas(html);
    this.state = new State();
  }

  setMap(map) {
    this.map = map;
    search('');
    this.canvas.loadMap();
  }

}

export const global = new Global();