import { global } from '../global/global';
export function pagePrepareCreate() {
  let header = document.getElementById('create-page-header');
  let button = document.getElementById('create-page');
  let selectImage = document.getElementById('select-image');
  let text = document.getElementById('page-text-input');
  header.innerText = 'Create page';
  button.innerText = 'Create';
  selectImage.innerText = 'Select Image';
  text.value = '';
  global.state.selectedImage = undefined;
  global.state.menuSelectedPage = undefined;
  onPageInputChange();
}
export function pagePrepareEdit() {
  let header = document.getElementById('create-page-header');
  let button = document.getElementById('create-page');
  let selectImage = document.getElementById('select-image');
  let text = document.getElementById('page-text-input');
  let page = global.map.pages.find(p => p.id === global.state.menuSelectedPage);
  header.innerText = 'Edit page';
  button.innerText = 'Save';
  selectImage.innerText = 'Select Image';
  text.value = page.name;
  global.state.selectedImage = page.image;
  onPageInputChange();
}
export function onPageInputChange() {
  let text = document.getElementById('page-text-input');
  let button = document.getElementById('create-page');
  let selectedImage = global.state.selectedImage;
  let unique = global.map.pages.every(p => p.name !== text.value);
  button.disabled = !(text.value && selectedImage && unique);
}