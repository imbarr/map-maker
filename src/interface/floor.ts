import { global } from '../global/global'
import { Floor } from '../global/map/floor'
import { Page } from '../global/map/page'

export function populateFloorList() {
  let list = document.getElementById('floor-list')
  list.innerHTML = ''

  global.map.pages.find(p => p.id === global.state.selectedPage).floors.forEach(addFloor)
}

export function setFloorName(f: Floor, name: string) {
  let list = document.getElementById('floor-list')
  let child = Array.from(list.children)
    .find(c => (c as HTMLElement).dataset.floor === f.id) as HTMLElement
  let span = child.getElementsByTagName('span')[0]

  span.innerText = name
}

export function addFloor(f: Floor) {
  let list = document.getElementById('floor-list')
  let elem = document.createElement('li')
  elem.setAttribute('data-floor', f.id)
  elem.innerHTML = `<span>${f.name}</span> <div class="page-bleep hide" data-floor="${f.id}"></div>`

  if (global.state.selectedFloor === f.id) {
    elem.classList.add('page-selected')
  }

  elem.addEventListener('click', () => {
    Array.from(list.children).forEach(c => c.classList.remove('page-selected'))

    global.state.selectedFloor = f.id
    elem.classList.add('page-selected')
    let pageState = global.state.pageStates.find(s => s.id === global.state.selectedPage)
    pageState.selectedFloor = f.id

    global.canvas.loadMap()
  })

  list.appendChild(elem)
}
