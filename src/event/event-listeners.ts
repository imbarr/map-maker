import * as event from './events'

document.getElementById('set-image').addEventListener('click', event.onSetImage)
document.getElementById('canvas').addEventListener('contextmenu', event.openContextMenu)
document.getElementById('canvas').addEventListener('click', event.closeContextMenu)
document.getElementById('contextmenu').addEventListener('click', event.closeContextMenu)

document.getElementById('menu-create-icon').addEventListener('click', event.onMenuCreateIcon)

document.getElementById('close-modal').addEventListener('click', event.onCloseModal)
document.getElementById('modal').addEventListener('click', event.onCloseModal)
document.getElementById('modal-content').addEventListener('click', event.stopPropagation)
document.getElementById('select-icon').addEventListener('click', event.onSelectIcon)
document.getElementById('create-icon').addEventListener('click', event.onCreateIcon)

document.getElementById('search-field').addEventListener('input', event.onSearch)
document.getElementById('add-icon').addEventListener('click', event.onAddIcon)