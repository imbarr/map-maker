import { global } from '../global/global'

export function openContextMenu(event) {
  let menu = document.getElementById('contextmenu')
  let createIcon = document.getElementById('menu-create-icon')
  let edit = document.getElementById('menu-edit')
  let cut = document.getElementById('menu-cut')
  let copy = document.getElementById('menu-copy')
  let paste = document.getElementById('menu-paste')
  let del = document.getElementById('menu-delete')
  let createPage = document.getElementById('menu-page-create')
  let editPage = document.getElementById('menu-page-edit')
  let createFloor = document.getElementById('menu-floor-create')
  let editFloor = document.getElementById('menu-floor-edit')

  createIcon.classList.add('hide')
  edit.classList.add('hide')
  cut.classList.add('hide')
  copy.classList.add('hide')
  paste.classList.add('hide')
  del.classList.add('hide')
  createPage.classList.add('hide')
  editPage.classList.add('hide')
  createFloor.classList.add('hide')
  editFloor.classList.add('hide')

  let target = event.target
  let open =
    target.id === 'page-list' ||
    target.id === 'floor-list' ||
    target.classList.contains('background-image') ||
    target.dataset.id ||
    target.parentElement.dataset.page ||
    target.parentElement.dataset.floor

  event.preventDefault()

  if (target.dataset.id) {
    global.state.selectedMarker = target.dataset.id

    edit.classList.remove('hide')
    cut.classList.remove('hide')
    copy.classList.remove('hide')
    del.classList.remove('hide')
  } else if (target.classList.contains('background-image')) {
    global.canvas.setSelectedCoords(event.pageX, event.pageY)

    createIcon.classList.remove('hide')
    paste.classList.remove('hide')
    if (global.state.copyingMarker || global.state.cuttingMarker) {
      paste.classList.remove('hide')
    } else {
      paste.classList.add('hide')
    }
  } else if (target.id === 'page-list') {
    createPage.classList.remove('hide')
  } else if (target.parentElement.dataset.page) {
    global.state.menuSelectedPage = target.parentElement.dataset.page
    editPage.classList.remove('hide')
  } else if (target.id === 'floor-list') {
    createFloor.classList.remove('hide')
  } else if (target.parentElement.dataset.floor) {
    global.state.menuSelectedFloor = target.parentElement.dataset.floor
    editFloor.classList.remove('hide')
  }

  if (open) {
    menu.style.top = `${event.clientY}px`
    menu.style.left = `${event.clientX}px`
    menu.classList.add('show')
  }
}
