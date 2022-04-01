import { getCanvas } from '../globals'
import { Marker } from '../item/marker'
import { IconsList, PopulateIconList } from '../icons'

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
      let canvas = getCanvas()
      canvas.setImage(img)
      canvas.render()
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
  const canvas = getCanvas()
  canvas.setSelectedCoords(event.pageX, event.pageY)

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
  const canvas = getCanvas()
  let icon = document.getElementById('select-icon-input').value
  let text = document.getElementById('text-input').value

  const marker = new Marker(icon, text, canvas.selectedCoords)
  canvas.map.addMarker(marker)
  canvas.render()
  modal.classList.remove('show')
}

export function onSelectIcon(event) {
  let list = document.getElementById('select-icon-list')
  if (list.classList.contains('show')) {
    list.classList.remove('show')
  } else {
    PopulateIconList(list)
    list.classList.add('show')
  }
}
