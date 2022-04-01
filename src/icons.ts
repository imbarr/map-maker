import { getCanvas } from './globals'

export const IconsList = {
  'enemy': {
    name: 'Enemy',
    file: 'enemy.svg'
  },
  'message': {
    name: 'Message',
    file: 'message.svg'
  },
}

export function PopulateIconList(list: HTMLElement) {
  list.innerHTML = ''
  let keys = Object.keys(IconsList)
  keys.forEach(key => {
    let elem = document.createElement('li')
    elem.classList.add('dropdown-item')
    elem.addEventListener('click', () => {
      document.getElementById('select-icon').innerText = IconsList[key].name
      document.getElementById('select-icon-input').setAttribute('value', key)
      list.classList.remove('show')
    })
    elem.innerHTML = IconsList[key].name
    list.appendChild(elem)
  })
}
