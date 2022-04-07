import { global } from '../global/global';
import { search } from '../interface/search';
import { Map } from '../global/map/map';
import { populateIconList, onInputChange, prepareEdit, prepareCreate, onCreate } from '../interface/create-marker'; // @ts-ignore

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
  let createIcon = document.getElementById('menu-create-icon');
  let edit = document.getElementById('menu-edit');
  let cut = document.getElementById('menu-cut');
  let copy = document.getElementById('menu-copy');
  let paste = document.getElementById('menu-paste');
  let del = document.getElementById('menu-delete');
  event.preventDefault();
  global.canvas.setSelectedCoords(event.pageX, event.pageY);
  global.state.selectedMarker = event.target.dataset.id;

  if (global.state.selectedMarker) {
    createIcon.classList.add('hide');
    edit.classList.remove('hide');
    cut.classList.remove('hide');
    copy.classList.remove('hide');
    paste.classList.add('hide');
    del.classList.remove('hide');
  } else {
    createIcon.classList.remove('hide');
    edit.classList.add('hide');
    cut.classList.add('hide');
    copy.classList.add('hide');
    paste.classList.remove('hide');
    del.classList.add('hide');

    if (global.state.copyingMarker || global.state.cuttingMarker) {
      paste.classList.remove('hide');
    } else {
      paste.classList.add('hide');
    }
  }

  menu.style.top = `${event.clientY}px`;
  menu.style.left = `${event.clientX}px`;
  menu.classList.add('show');
}
export function closeContextMenu() {
  menu.classList.remove('show');
}
export function onMenuCreateIcon() {
  prepareCreate();
  modal.classList.add('show');
}
export function onMenuEdit() {
  global.state.editingMarker = global.state.selectedMarker;
  prepareEdit();
  modal.classList.add('show');
}
export function onMenuCut() {
  global.state.copyingMarker = undefined;
  global.state.cuttingMarker = global.state.selectedMarker;
}
export function onMenuCopy() {
  global.state.cuttingMarker = undefined;
  global.state.copyingMarker = global.state.selectedMarker;
}
export function onMenuPaste() {
  let id = global.state.copyingMarker || global.state.cuttingMarker;
  let marker = global.map.markers.find(m => m.id === id);
  let coords = global.canvas.selectedCoords;

  if (global.state.cuttingMarker) {
    global.state.cuttingMarker = undefined;
    marker.coords = coords;
  } else {
    let newMarker = marker.copy(coords);
    global.map.markers.push(newMarker);
  }

  onMarkersEdited();
}
export function onMenuDelete() {
  global.map.markers = global.map.markers.filter(m => m.id !== global.state.selectedMarker);
  onMarkersEdited();
}
export function onCloseModal() {
  modal.classList.remove('show');
}
export function onModalClick(event) {
  document.getElementById('select-icon-list').classList.remove('show');
  event.stopPropagation();
}
export function onCreateIcon() {
  onCreate();
  modal.classList.remove('show');
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