import { global } from '../global/global'
import { markerSize } from '../global/constants/other'
import { Icon } from '../global/icon'

export function populateIconList(list: HTMLElement) {
  list.innerHTML = ''
  global.state.icons.forEach(icon => {
    let elem = document.createElement('li')
    elem.classList.add('dropdown-item')
    elem.addEventListener('click', () => {
      let selectIcon = document.getElementById('select-icon')
      selectIcon.innerHTML = iconImage(icon)
      global.state.createIconSelected = icon

      list.classList.remove('show')
    })
    elem.innerHTML = iconImage(icon)
    list.appendChild(elem)
  })
}

function iconImage(icon: Icon): string {
  return `<img src="${icon.image.src}"
               width="${markerSize}px"
               height="${markerSize}px"
               alt="not found"/>`
}
