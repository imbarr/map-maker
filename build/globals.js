import { Canvas } from './canvas/canvas';
let canvas;
export const markerSize = 20;
let map;
export function setMap(m) {
  map = m;
}
export function getMap() {
  return map;
}
export function getCanvas() {
  if (canvas) {
    return canvas;
  }

  let html = document.getElementById('canvas');
  canvas = new Canvas(html);
  return canvas;
}