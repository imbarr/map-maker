import { global } from '../global/global';
import { markerSize } from '../global/constants/other';
import { JumpIcons } from '../global/constants/jump-icons';
import { Jump } from '../global/map/jump';
export function onCreateJump() {
  let jump = new Jump(global.canvas.selectedCoords, global.state.createJumpIcon.id, global.state.selectedFloor, global.state.createJumpFloor);
  global.map.jumps.push(jump);
}
export function prepareFloorCreate() {
  let icon = document.getElementById('create-jump-select-icon');
  let floor = document.getElementById('create-jump-select-floor');
  icon.innerText = 'Select icon';
  floor.innerText = 'Select floor';
  global.state.createJumpIcon = undefined;
  global.state.createJumpFloor = undefined;
  populateFloorList();
  populateIconList();
}

function populateFloorList() {
  let list = document.getElementById('create-jump-select-floor-list');
  let floors = global.map.floors.filter(f => f.page === global.state.selectedPage).filter(f => f.id !== global.state.selectedFloor);
  list.innerHTML = '';
  floors.forEach(floor => {
    let elem = document.createElement('li');
    elem.innerText = floor.name;
    elem.classList.add('dropdown-item');
    elem.addEventListener('click', () => {
      selectFloor(floor);
      list.classList.remove('show');
      onInputChange();
    });
    list.appendChild(elem);
  });
}

function selectFloor(floor) {
  let selectFloor = document.getElementById('create-jump-select-floor');
  selectFloor.innerText = floor.name;
  global.state.createJumpFloor = floor.id;
}

function populateIconList() {
  let list = document.getElementById('create-jump-select-icon-list');
  list.innerHTML = '';
  JumpIcons.forEach(icon => {
    let elem = document.createElement('li');
    elem.classList.add('dropdown-item');
    elem.addEventListener('click', () => {
      selectIcon(icon);
      list.classList.remove('show');
      onInputChange();
    });
    elem.innerHTML = iconImage(icon);
    list.appendChild(elem);
  });
}

function onInputChange() {
  let button = document.getElementById('create-jump');
  button.disabled = !(global.state.createJumpIcon && global.state.createJumpFloor);
}

function selectIcon(icon) {
  let selectIcon = document.getElementById('create-jump-select-icon');
  selectIcon.innerHTML = iconImage(icon);
  global.state.createJumpIcon = icon;
}

function iconImage(icon) {
  return `<img src="${icon.image.src}"
               width="${markerSize}px"
               height="${markerSize}px"
               alt="not found"/>`;
}