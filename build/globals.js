import { Canvas } from './canvas/canvas';
let canvas;
export function getCanvas() {
  if (canvas) {
    return canvas;
  }

  let html = document.getElementById('canvas');
  canvas = new Canvas(html);
  return canvas;
}