import {Canvas} from './canvas/canvas'

let canvas: Canvas

export const markerSize = 20

export function getCanvas(): Canvas {
  if (canvas) {
    return canvas
  }

  let html = document.getElementById('canvas')
  canvas = new Canvas(html)
  return canvas
}
