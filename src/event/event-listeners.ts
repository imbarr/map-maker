import * as event from './events'

document.getElementById('canvas').addEventListener('contextmenu', event.openContextMenu)
document.getElementById('canvas').addEventListener('click', event.closeContextMenu)

// Menu
document.getElementById('set-image').addEventListener('click', event.onSetImage)

// Context menu
document.getElementById('contextmenu').addEventListener('click', event.closeContextMenu)
document.getElementById('menu-create-icon').addEventListener('click', event.onMenuCreateIcon)
document.getElementById('menu-edit').addEventListener('click', event.onMenuEdit)
document.getElementById('menu-cut').addEventListener('click', event.onMenuCut)
document.getElementById('menu-copy').addEventListener('click', event.onMenuCopy)
document.getElementById('menu-paste').addEventListener('click', event.onMenuPaste)
document.getElementById('menu-delete').addEventListener('click', event.onMenuDelete)


// Create icon modal
document.getElementById('close-modal').addEventListener('click', event.onCloseModal)
document.getElementById('modal').addEventListener('click', event.onCloseModal)
document.getElementById('modal-content').addEventListener('click', event.onModalClick)
document.getElementById('select-icon').addEventListener('click', event.onSelectIcon)
document.getElementById('create-icon').addEventListener('click', event.onCreateIcon)
document.getElementById('add-icon').addEventListener('click', event.onAddIcon)
document.getElementById('text-input').addEventListener('input', event.onTextInputChange)

// Search
document.getElementById('search-field').addEventListener('input', event.onSearch)
document.getElementById('tag-search-field').addEventListener('input', event.onTagSearch)
document.getElementById('tag-select-all').addEventListener('input', event.onTagSelectAll)