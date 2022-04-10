import { global } from '../global/global';
import { searchCurrentValue } from './search';
export function onCheckAll() {
  let check = document.getElementById('tag-select-all');
  let list = document.getElementById('tag-search-list');
  list.childNodes.forEach(li => {
    let target = li.getElementsByTagName('input')[0];
    target.checked = check.checked;
  });

  if (check.checked) {
    global.state.selectedTags = [...global.state.tags];
  } else {
    global.state.selectedTags = [];
  }

  global.canvas.loadMap();
}
export function tagSearch(value) {
  let list = document.getElementById('tag-search-list');
  let filtered = global.state.tags.filter(m => m.toLowerCase().includes(value.toLowerCase()));
  global.state.selectedTags = [];
  list.innerHTML = '';
  filtered.forEach(el => {
    let elem = document.createElement('li');
    elem.innerHTML = `<input type="checkbox">
                      <span>${el}</span>`;
    elem.addEventListener('click', e => onCheck(e, el));
    list.appendChild(elem);
  });
}
export function tagSearchCurrentValue() {
  let value = document.getElementById('tag-search-field').value;
  tagSearch(value);
}

function onCheck(event, tag) {
  let target = event.currentTarget.getElementsByTagName('input')[0];
  let checkAll = document.getElementById('tag-select-all');
  target.checked = !global.state.selectedTags.includes(tag);

  if (target.checked) {
    global.state.selectedTags.push(tag);
  } else {
    global.state.selectedTags.splice(global.state.selectedTags.indexOf(tag), 1);
  }

  checkAll.checked = global.state.selectedTags.length === global.state.tags.length;
  searchCurrentValue();
}