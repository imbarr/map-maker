type Coords = {
  x: number
  y: number
}

type Size = {
  width: number
  height: number
}

function setCoords(elem: HTMLElement, coords: Coords, scale: number) {
  elem.style.left = coords.x * scale + 'px'
  elem.style.top = coords.y * scale + 'px'
}

function setSize(elem: HTMLElement, size: Size, scale: number) {
  elem.style.width = size.width * scale + 'px'
  elem.style.height = size.height * scale + 'px'
}
