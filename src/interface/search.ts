import { global } from '../global/global'
import { Marker } from '../global/map/marker'
import { markerSize } from '../global/constants/other'

export function search(value: string) {
  let list = document.getElementById('search-list')
  let filtered = global.map.markers.filter(m => m.text.includes(value))
  global.state.filteredMarkers = filtered

  list.innerHTML = ''
  filtered.forEach(el => {
    let elem = document.createElement('li')
    let text = el.text.replace('\n', `<br>`)
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
}

function bleep(marker: Marker) {
  let coords = {
    x: marker.coords.x * global.canvas.scale,
    y: marker.coords.y * global.canvas.scale
  }

  let bleep = document.getElementById('bleep')
  bleep.style.left = coords.x + 'px'
  bleep.style.top = coords.y + 'px'
  bleep.classList.add('show')

  setTimeout(() => {
    bleep.classList.remove('show')
    setTimeout(() => {
      bleep.classList.add('show')
      setTimeout(() => {
        bleep.classList.remove('show')
      }, 200)
    }, 200)
  }, 200)
}