import { global } from '../global/global';
import { search } from '../interface/search';
import { Map } from '../global/map/map';
import { populateIconList, onInputChange, onModalClose } from '../interface/create-marker'; // @ts-ignore

import { v4 as uuid } from 'uuid';
import { onMarkersEdited } from '../interface/common';
import { onCheckAll, tagSearch } from '../interface/tag';
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
  onModalClose();
}
export function onModalClick(event) {
  document.getElementById('select-icon-list').classList.remove('show');
  event.stopPropagation();
}
export function onCreateIcon() {
  let text = document.getElementById('text-input').value;
  let tagInput = document.getElementById('tag-input');
  let tags = tagInput.value.split('\n');
  global.state.addNewTags(tags);
  const marker = {
    icon: global.state.createIconSelected.id,
    text: text,
    coords: global.canvas.selectedCoords,
    tags: tags
  };
  global.map.markers.push(marker);
  global.canvas.loadMap();
  modal.classList.remove('show');
  onModalClose();
  onMarkersEdited();
}
export function onSelectIcon(event) {
  event.stopPropagation();
  let list = document.getElementById('select-icon-list');

  if (list.classList.contains('show')) {
    list.classList.remove('show');
  } else {
    populateIconList(list);
    list.classList.add('show');
  }
}
export function onSearch() {
  search(this.value);
  global.canvas.loadMap();
}
export function onTagSearch() {
  tagSearch(this.value);
}
export function onTagSelectAll() {
  onCheckAll();
}
export function onAddIcon() {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = event => {
    let file = event.target.files[0];
    let img = new Image();

    img.onload = () => {
      global.state.icons.push({
        id: uuid(),
        image: img
      });
    };

    img.onerror = () => {
      alert('Invalid image');
    };

    img.src = URL.createObjectURL(file);
  };

  input.click();
}
export function onTextInputChange() {
  onInputChange();
}