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

  let target = event.target
  let open =
    target.id === 'page-list' ||
    target.classList.contains('background-image') ||
    target.dataset.id

  event.preventDefault()

  global.canvas.setSelectedCoords(event.pageX, event.pageY)
  global.state.selectedMarker = event.target.dataset.id

  if (global.state.selectedMarker) {
    createIcon.classList.add('hide')
    edit.classList.remove('hide')
    cut.classList.remove('hide')
    copy.classList.remove('hide')
    paste.classList.add('hide')
    del.classList.remove('hide')
    createPage.classList.add('hide')
  } else if (target.classList.contains('background-image')) {
    createIcon.classList.remove('hide')
    edit.classList.add('hide')
    cut.classList.add('hide')
    copy.classList.add('hide')
    paste.classList.remove('hide')
    del.classList.add('hide')
    createPage.classList.add('hide')

    if (global.state.copyingMarker || global.state.cuttingMarker) {
      paste.classList.remove('hide')
    } else {
      paste.classList.add('hide')
    }
  } else if (target.id === 'page-list') {
    createIcon.classList.add('hide')
    edit.classList.add('hide')
    cut.classList.add('hide')
    copy.classList.add('hide')
    paste.classList.add('hide')
    del.classList.add('hide')
    createPage.classList.remove('hide')
  }

  if (open) {
    menu.style.top = `${event.clientY}px`
    menu.style.left = `${event.clientX}px`
    menu.classList.add('show')
  }
}