import { global } from '../global/global'
import { markerSize } from '../global/constants/other'
import { Icon } from '../global/icon'
import { Marker } from '../global/map/marker'

export function prepareEdit() {
  let title = document.getElementById('create-marker-modal-title')
  let createButton = document.getElementById('create-icon')
  let textInput = document.getElementById('text-input') as HTMLInputElement
  let descInput = document.getElementById('desc-input') as HTMLInputElement
  let tagInput = document.getElementById('tag-input') as HTMLInputElement

  let marker = global.map.markers.find(m => m.id === global.state.editingMarker)
  let icon = global.state.icons.find(i => i.id === marker.icon)

  title.innerText = 'Edit icon'
  createButton.innerText = 'Save'
  selectIcon(icon)
  textInput.value = marker.text
  descInput.value = marker.desc
  tagInput.value = marker.tags.join('\n')

  onInputChange()
}

export function prepareCreate() {
  let title = document.getElementById('create-marker-modal-title')
  let createButton = document.getElementById('create-icon')
  let textInput = document.getElementById('text-input') as HTMLInputElement
  let descInput = document.getElementById('desc-input') as HTMLInputElement
  let tagInput = document.getElementById('tag-input') as HTMLInputElement
  let selectIcon = document.getElementById('select-icon')

  title.innerText = 'Create icon'
  createButton.innerText = 'Create'
  textInput.value = ''
  descInput.value = ''
  tagInput.value = ''
  selectIcon.innerHTML = 'Select Icon'
  global.state.createIconSelected = undefined
  global.state.editingMarker = undefined

  onInputChange()
}

export function onCreate() {
  let text = (document.getElementById('text-input') as HTMLInputElement).value
  let desc = (document.getElementById('desc-input') as HTMLInputElement).value
  let tagInput = document.getElementById('tag-input') as HTMLInputElement
  let tags = tagInput.value
    .split('\n')
    .map(t => t.trim())
    .filter(t => t.length > 0)
  global.state.addNewTags(tags)

  if (global.state.editingMarker) {
    let marker = global.map.markers.find(m => m.id === global.state.editingMarker)
    marker.icon = global.state.createIconSelected.id
    marker.text = text
    marker.desc = desc
    marker.tags = tags
  } else {
    const marker = new Marker(
      global.state.createIconSelected.id,
      global.state.selectedFloor,
      text,
      desc,
      global.canvas.selectedCoords,
      tags
    )
    global.map.markers.push(marker)
  }
}

export function populateIconList(list: HTMLElement) {
  list.innerHTML = ''
  global.state.icons.forEach(icon => {
    let elem = document.createElement('li')
    elem.classList.add('dropdown-item')
    elem.addEventListener('click', () => {
      selectIcon(icon)

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

function selectIcon(icon: Icon) {
  let selectIcon = document.getElementById('select-icon')
  selectIcon.innerHTML = iconImage(icon)
  global.state.createIconSelected = icon
}

function iconImage(icon: Icon): string {
  return `<img src="${icon.image.src}"
               width="${markerSize}px"
               height="${markerSize}px"
               alt="not found"/>`
}
