import { global } from '../global/global'
import { search, searchCurrentValue } from '../interface/search'
import { Map } from '../global/map/map'
import { Marker } from '../global/map/marker'
import { populateIconList } from '../interface/create-marker'
import { v4 as uuid } from 'uuid';

const menu = document.getElementById('contextmenu')
const modal = document.getElementById('modal')

export function onSetImage() {
  let input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'

  input.onchange = event => {
    let file = (event.target as HTMLInputElement).files[0]

    let img = new Image()
    img.onload = () => {
      global.setMap(new Map(img, []))
    }

    img.onerror = () => {
      alert('Invalid image')
    }

    img.src = URL.createObjectURL(file);
  }

  input.click()
}

export function openContextMenu(event) {
  event.preventDefault()
  global.canvas.setSelectedCoords(event.pageX, event.pageY)

  menu.style.top = `${event.clientY}px`
  menu.style.left = `${event.clientX}px`
  menu.classList.add('show')
}

export function closeContextMenu() {
  menu.classList.remove('show')
}

export function onMenuCreateIcon() {
  modal.classList.add('show')
}

export function onCloseModal() {
  modal.classList.remove('show')
}

export function stopPropagation(event) {
  event.stopPropagation()
}

export function onCreateIcon() {
  let text = (document.getElementById('text-input') as HTMLInputElement).value

  const marker = new Marker(global.state.createIconSelected.id, text, global.canvas.selectedCoords)
  global.map.markers.push(marker)
  searchCurrentValue()
  global.canvas.loadMap()
  modal.classList.remove('show')
}

export function onSelectIcon() {
  let list = document.getElementById('select-icon-list')
  if (list.classList.contains('show')) {
    list.classList.remove('show')
  } else {
    populateIconList(list)
    list.classList.add('show')
  }
}

export function onSearch() {
  search(this.value)
  global.canvas.loadMap()
}

export function onAddIcon() {
  let input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'

  input.onchange = event => {
    let file = (event.target as HTMLInputElement).files[0]

    let img = new Image()
    img.onload = () => {
      global.state.icons.push({ id: uuid(), image: img })
    }

    img.onerror = () => {
      alert('Invalid image')
    }

    img.src = URL.createObjectURL(file);
  }

  input.click()
}
