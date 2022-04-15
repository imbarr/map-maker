import { global } from '../global/global';
import { populateFloorList } from './floor';
export function populatePageList() {
  let list = document.getElementById('page-list');
  list.innerHTML = '';
  global.map.pages.forEach(addPage);
}
export function setPageName(p, name) {
  let list = document.getElementById('page-list');
  let child = Array.from(list.children).find(c => c.dataset.page === p.id);
  let span = child.getElementsByTagName('span')[0];
  span.innerText = name;
}
export function addPage(p) {
  let list = document.getElementById('page-list');
  let elem = document.createElement('li');
  elem.setAttribute('data-page', p.id);
  elem.innerHTML = `<span>${p.name}</span> <div class="page-bleep hide" data-page="${p.id}"></div>`;

  if (global.state.selectedPage === p.id) {
    elem.classList.add('page-selected');
  }

  elem.addEventListener('click', () => {
    Array.from(list.children).forEach(c => c.classList.remove('page-selected'));
    global.state.selectedPage = p.id;
    elem.classList.add('page-selected');
    let pageState = global.state.pageStates.find(s => s.id === p.id);
    global.state.selectedFloor = pageState.selectedFloor;
    populateFloorList();
    global.canvas.loadMap();
    global.canvas.setState(pageState);
  });
  list.appendChild(elem);
  global.state.pageStates.push({
    id: p.id,
    selectedFloor: p.floors[0].id,
    scrollLeft: 0,
    scrollTop: 0,
    scale: 1
  });
}