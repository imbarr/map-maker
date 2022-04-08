import { global } from '../global/global';
import { search } from '../interface/search';
import { Map } from '../global/map/map';
import { populateIconList, onInputChange, prepareEdit, prepareCreate, onCreate } from '../interface/create-marker'; // @ts-ignore

import { v4 as uuid } from 'uuid';
import { onMarkersEdited } from '../interface/common';
import { onCheckAll, tagSearch } from '../interface/tag';
import { openContextMenu } from '../interface/context-menu';
import { Page } from '../global/map/page';
import { onPageInputChange } from '../interface/create-page';
import { addPage } from '../interface/page';
export function onSetImage() {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = event => {
    let file = event.target.files[0];
    let img = new Image();

    img.onload = () => {
      global.setMap(new Map([], [new Page('New page', img)]));
    };

    img.onerror = () => {
      alert('Invalid image');
    };

    img.src = URL.createObjectURL(file);
  };

  input.click();
}
export function onOpenContextMenu(event) {
  openContextMenu(event);
}
export function closeContextMenu() {
  let menu = document.getElementById('contextmenu');
  menu.classList.remove('show');
}
export function onScroll() {
  let pageState = global.state.pageStates.find(s => s.name === global.state.selectedPage);
  pageState.scrollLeft = global.canvas.html.parentElement.scrollLeft;
  pageState.scrollTop = global.canvas.html.parentElement.scrollTop;
}
export function onMenuCreateIcon() {
  prepareCreate();
  let modal = document.getElementById('create-marker-modal');
  modal.classList.add('show');
}
export function onMenuEdit() {
  global.state.editingMarker = global.state.selectedMarker;
  prepareEdit();
  let modal = document.getElementById('create-marker-modal');
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
export function onMenuPageCreate() {
  let modal = document.getElementById('create-page-modal');
  modal.classList.add('show');
}
export function onCloseMarkerModal() {
  let modal = document.getElementById('create-marker-modal');
  modal.classList.remove('show');
}
export function onClosePageModal() {
  let modal = document.getElementById('create-page-modal');
  modal.classList.remove('show');
}
export function onMarkerModalClick(event) {
  document.getElementById('select-icon-list').classList.remove('show');
  event.stopPropagation();
}
export function onPageModalClick(event) {
  event.stopPropagation();
}
export function onSelectImage() {
  let button = document.getElementById('select-image');
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = event => {
    let file = event.target.files[0];
    let img = new Image();

    img.onload = () => {
      global.state.selectedImage = img;
      button.innerText = file.name;
      onPageInputChange();
    };

    img.onerror = () => {
      alert('Invalid image');
    };

    img.src = URL.createObjectURL(file);
  };

  input.click();
}
export function onCreateIcon() {
  onCreate();
  let modal = document.getElementById('create-marker-modal');
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
export function onPageTextInputChange() {
  onPageInputChange();
}
export function onPageCreate() {
  let name = document.getElementById('page-text-input');
  let page = new Page(name.value, global.state.selectedImage);
  global.map.pages.push(page);
  addPage(page);
  let modal = document.getElementById('create-page-modal');
  modal.classList.remove('show');
}