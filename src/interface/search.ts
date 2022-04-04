import { global } from '../global/global'

export function search(value: string) {
  let list = document.getElementById('search-list')
  let filtered = global.map.markers.filter(m => m.text.includes(value))
  global.state.filteredMarkers = filtered

  list.innerHTML = ''
  filtered.forEach(el => {
    let elem = document.createElement('li')
    elem.innerHTML = el.text
    list.appendChild(elem)
  })
}

export function searchCurrentValue() {
  let value = (document.getElementById('search-field') as HTMLInputElement).value
  search(value)
}
