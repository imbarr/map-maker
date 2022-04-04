import { global } from '../global/global';
export function search(value) {
  let list = document.getElementById('search-list');
  let filtered = global.map.markers.filter(m => m.text.includes(value));
  global.state.filteredMarkers = filtered;
  list.innerHTML = '';
  filtered.forEach(el => {
    let elem = document.createElement('li');
    elem.innerHTML = el.text;
    elem.addEventListener('click', () => bleep(el));
    list.appendChild(elem);
  });
}
export function searchCurrentValue() {
  let value = document.getElementById('search-field').value;
  search(value);
}

function bleep(marker) {
  let coords = {
    x: marker.coords.x * global.canvas.scale,
    y: marker.coords.y * global.canvas.scale
  };
  let bleep = document.getElementById('bleep');
  bleep.style.left = coords.x + 'px';
  bleep.style.top = coords.y + 'px';
  bleep.classList.add('show');
  setTimeout(() => {
    bleep.classList.remove('show');
    setTimeout(() => {
      bleep.classList.add('show');
      setTimeout(() => {
        bleep.classList.remove('show');
      }, 200);
    }, 200);
  }, 200);
}