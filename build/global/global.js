import { Canvas } from './canvas';
import { State } from './state';
import { onSetMap } from '../interface/common';

class Global {
  constructor() {
    let html = document.getElementById('canvas');
    this.canvas = new Canvas(html);
    this.state = new State();
  }

  setMap(map) {
    this.map = map;
    onSetMap();
  }

}

export const global = new Global();