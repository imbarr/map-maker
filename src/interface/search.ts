import { global } from '../global/global'
import { Marker } from '../global/map/marker'
import { markerSize } from '../global/constants/other'

export function search(value: string) {
  let valueLower = value.toLowerCase()
  let list = document.getElementById('search-list')
  let selectedTags = global.state.selectedTags
  let filtered = global.map.markers.filter(m =>
    (m.text.toLowerCase().includes(valueLower) || m.desc.toLowerCase().includes(valueLower)) &&
    (selectedTags.length === 0 || selectedTags.filter(t => m.tags.includes(t)).length !== 0)
  )
  global.state.filteredMarkers = filtered

  list.innerHTML = ''
  filtered.forEach(el => {
    let elem = document.createElement('li')
    let text = el.text.replace(/\n/g, `<br>`)
    let icon = global.state.icons.find(i => i.id === el.icon)
    elem.innerHTML = `<img src="${icon.image.src}"
                           width="${markerSize}px"
                           height="${markerSize}px"
                           alt="not found"/>
                      <span>${text}</span>`
    elem.addEventListener('click', () => bleep(el))
    list.appendChild(elem)
  })
}

export function searchCurrentValue() {
  let value = (document.getElementById('search-field') as HTMLInputElement).value
  search(value)
  global.canvas.loadMap()
}

function bleep(marker: Marker) {
  let page = global.map.pages.find(p => p.floors.some(f => f.id === marker.floor)).id

  if (marker.floor === global.state.selectedFloor) {
    bleepCurrentFloor(marker)
  } else if (page === global.state.selectedPage) {
    bleepCurrentPage(marker)
  } else {
    bleepAnotherPage(page)
  }
}

function bleepCurrentFloor(marker: Marker) {
  let coords = {
    x: marker.coords.x * global.canvas.scale,
    y: marker.coords.y * global.canvas.scale
  }

  let bleep = document.getElementById('bleep')
  bleep.style.left = coords.x + 'px'
  bleep.style.top = coords.y + 'px'

  bleepElement(bleep)
}

function bleepAnotherPage(page: string) {
  let bleeps = document.getElementsByClassName('page-bleep')
  let bleep = Array.from(bleeps).find(b => (b as HTMLElement).dataset.page === page)

  bleepElement(bleep as HTMLElement)
}

function bleepCurrentPage(marker: Marker) {
  let bleeps = document.getElementsByClassName('page-bleep')
  let bleep = Array.from(bleeps).find(b => (b as HTMLElement).dataset.floor === marker.floor)

  bleepElement(bleep as HTMLElement)
}

function bleepElement(el: HTMLElement) {
  el.classList.remove('hide')
  setTimeout(() => {
    el.classList.add('hide')
    setTimeout(() => {
      el.classList.remove('hide')
      setTimeout(() => {
        el.classList.add('hide')
      }, 200)
    }, 200)
  }, 200)
}
