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
      onInputChange()
    })
    elem.innerHTML = iconImage(icon)
    list.appendChild(elem)
  })
}

export function onInputChange() {
  let textarea = document.getElementById('text-input') as HTMLInputElement
  let button = document.getElementById('create-icon') as HTMLButtonElement
  let selectedIcon = global.state.createIconSelected

  button.disabled = !(textarea.value && selectedIcon);
}

export function onModalClose() {
  let textarea = document.getElementById('text-input') as HTMLInputElement
  let selectIcon = document.getElementById('select-icon')

  textarea.value = ''
  selectIcon.innerHTML = 'Select Icon'
  global.state.createIconSelected = undefined
  onInputChange()
}

function iconImage(icon: Icon): string {
  return `<img src="${icon.image.src}"
               width="${markerSize}px"
               height="${markerSize}px"
               alt="not found"/>`
}
