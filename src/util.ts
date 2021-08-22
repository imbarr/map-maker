export type Coords = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export function setCoords(elem: HTMLElement, coords: Coords, scale: number) {
  elem.style.left = coords.x * scale + 'px'
  elem.style.top = coords.y * scale + 'px'
}

export function setSize(elem: HTMLElement, size: Size, scale: number) {
  elem.style.width = size.width * scale + 'px'
  elem.style.height = size.height * scale + 'px'
}
