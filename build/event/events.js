import { global } from '../global/global';
import { PopulateIconList } from '../icons';
import { search, searchCurrentValue } from '../interface/search';
import { Map } from '../global/map/map';
import { Marker } from '../global/map/marker';
const menu = document.getElementById('contextmenu');
const modal = document.getElementById('modal');
export function onSetImage() {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = event => {
    let file = event.target.files[0];
    let img = new Image();

    img.onload = () => {
      global.setMap(new Map(img, []));
    };

    img.onerror = () => {
      alert('Invalid image');
    };

    img.src = URL.createObjectURL(file);
  };

  input.click();
}
export function openContextMenu(event) {
  event.preventDefault();
  global.canvas.setSelectedCoords(event.pageX, event.pageY);
  menu.style.top = `${event.clientY}px`;
  menu.style.left = `${event.clientX}px`;
  menu.classList.add('show');
}
export function closeContextMenu() {
  menu.classList.remove('show');
}
export function onMenuCreateIcon() {
  modal.classList.add('show');
}
export function onCloseModal() {
  modal.classList.remove('show');
}
export function stopPropagation(event) {
  event.stopPropagation();
}
export function onCreateIcon() {
  let icon = document.getElementById('select-icon-input').value;
  let text = document.getElementById('text-input').value;
  const marker = new Marker(icon, text, global.canvas.selectedCoords);
  global.map.markers.push(marker);
  searchCurrentValue();
  global.canvas.loadMap();
  modal.classList.remove('show');
}
export function onSelectIcon() {
  let list = document.getElementById('select-icon-list');

  if (list.classList.contains('show')) {
    list.classList.remove('show');
  } else {
    PopulateIconList(list);
    list.classList.add('show');
  }
}
export function onSearch() {
  search(this.value);
  global.canvas.loadMap();
}