export function setCoords(elem, coords, scale) {
  elem.style.left = coords.x * scale + 'px';
  elem.style.top = coords.y * scale + 'px';
}
export function setSize(elem, size, scale) {
  elem.style.width = size.width * scale + 'px';
  elem.style.height = size.height * scale + 'px';
}