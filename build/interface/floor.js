import { global } from '../global/global';
export function populateFloorList() {
  let list = document.getElementById('floor-list');
  list.innerHTML = '';
  global.map.floors.filter(f => f.page === global.state.selectedPage).forEach(addFloor);
}
export function setFloorName(f, name) {
  let list = document.getElementById('floor-list');
  let child = Array.from(list.children).find(c => c.dataset.floor === f.id);
  let span = child.getElementsByTagName('span')[0];
  span.innerText = name;
}
export function selectFloor(floor) {
  let floorList = document.getElementById('floor-list');
  let floors = Array.from(floorList.children).map(c => c);
  let selected = floors.find(c => c.dataset.floor === floor);
  floors.forEach(f => f.classList.remove('page-selected'));
  selected.classList.add('page-selected');
}
export function addFloor(f) {
  let list = document.getElementById('floor-list');
  let elem = document.createElement('li');
  elem.setAttribute('data-floor', f.id);
  elem.innerHTML = `<span>${f.name}</span> <div class="page-bleep hide" data-floor="${f.id}"></div>`;

  if (global.state.selectedFloor === f.id) {
    elem.classList.add('page-selected');
  }

  elem.addEventListener('click', () => {
    Array.from(list.children).forEach(c => c.classList.remove('page-selected'));
    global.state.selectedFloor = f.id;
    elem.classList.add('page-selected');
    let pageState = global.state.pageStates.find(s => s.id === global.state.selectedPage);
    pageState.selectedFloor = f.id;
    global.canvas.loadMap();
  });
  list.appendChild(elem);
}