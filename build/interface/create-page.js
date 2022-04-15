import { global } from '../global/global';
export function pagePrepareCreate() {
  let header = document.getElementById('create-page-header');
  let button = document.getElementById('create-page');
  let selectImage = document.getElementById('select-image');
  let selectImageTitle = document.getElementById('select-image-title');
  let text = document.getElementById('page-text-input');
  header.innerText = 'Create page';
  button.innerText = 'Create';
  selectImage.innerText = 'Select Image';
  selectImage.classList.remove('hide');
  selectImageTitle.classList.remove('hide');
  text.value = '';
  global.state.selectedImage = undefined;
  global.state.menuSelectedPage = undefined;
  global.state.menuSelectedFloor = undefined;
  onPageInputChange();
}
export function floorPrepareCreate() {
  let header = document.getElementById('create-page-header');
  let button = document.getElementById('create-page');
  let selectImage = document.getElementById('select-image');
  let selectImageTitle = document.getElementById('select-image-title');
  let text = document.getElementById('page-text-input');
  header.innerText = 'Create floor';
  button.innerText = 'Create';
  selectImage.innerText = 'Select Image';
  selectImage.classList.remove('hide');
  selectImageTitle.classList.remove('hide');
  text.value = '';
  global.state.selectedImage = undefined;
  global.state.menuSelectedPage = undefined;
  global.state.menuSelectedFloor = undefined;
  onPageInputChange();
}
export function pagePrepareEdit() {
  let header = document.getElementById('create-page-header');
  let button = document.getElementById('create-page');
  let selectImage = document.getElementById('select-image');
  let selectImageTitle = document.getElementById('select-image-title');
  let text = document.getElementById('page-text-input');
  let page = global.map.pages.find(p => p.id === global.state.menuSelectedPage);
  header.innerText = 'Edit page';
  button.innerText = 'Save';
  selectImage.classList.add('hide');
  selectImageTitle.classList.add('hide');
  text.value = page.name;
  global.state.menuSelectedFloor = undefined;
  onPageInputChange();
}
export function floorPrepareEdit() {
  let header = document.getElementById('create-page-header');
  let button = document.getElementById('create-page');
  let selectImage = document.getElementById('select-image');
  let selectImageTitle = document.getElementById('select-image-title');
  let text = document.getElementById('page-text-input');
  let floor = global.map.getAllFloors().find(f => f.id === global.state.menuSelectedFloor);
  header.innerText = 'Edit floor';
  button.innerText = 'Save';
  selectImage.classList.remove('hide');
  selectImageTitle.classList.remove('hide');
  text.value = floor.name;
  global.state.menuSelectedPage = undefined;
  onPageInputChange();
}
export function onPageInputChange() {
  let text = document.getElementById('page-text-input');
  let button = document.getElementById('create-page');
  let selectedImage = global.state.selectedImage || global.state.menuSelectedPage;
  button.disabled = !(text.value && selectedImage);
}