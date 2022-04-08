import { global } from '../global/global';
export function populatePageList() {
  let list = document.getElementById('page-list');
  list.innerHTML = '';
  global.map.pages.forEach(addPage);
}
export function setPageName(p, name) {
  let list = document.getElementById('page-list');
  let child = Array.from(list.children).find(c => c.dataset.page === p.name);
  let span = child.getElementsByTagName('span')[0];
  child.dataset.page = name;
  span.innerText = name;
}
export function addPage(p) {
  let list = document.getElementById('page-list');
  let elem = document.createElement('li');
  elem.setAttribute('data-page', p.name);
  elem.innerHTML = `<span>${p.name}</span> <div class="page-bleep hide" data-id="${p.name}"></div>`;

  if (global.state.selectedPage === p.name) {
    elem.classList.add('page-selected');
  }

  elem.addEventListener('click', () => {
    Array.from(list.children).forEach(c => c.classList.remove('page-selected'));
    global.state.selectedPage = p.name;
    elem.classList.add('page-selected');
    let pageState = global.state.pageStates.find(s => s.name === p.name);
    global.canvas.loadMap();
    global.canvas.setState(pageState);
  });
  list.appendChild(elem);
  global.state.pageStates.push({
    name: p.name,
    scrollLeft: 0,
    scrollTop: 0,
    scale: 1
  });
}