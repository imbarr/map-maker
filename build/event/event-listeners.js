import * as event from './events';
document.getElementById('container').addEventListener('contextmenu', event.onOpenContextMenu);
document.getElementById('container').addEventListener('click', event.closeContextMenu); // Menu

document.getElementById('set-image').addEventListener('click', event.onSetImage); // Context menu

document.getElementById('contextmenu').addEventListener('click', event.closeContextMenu);
document.getElementById('menu-create-icon').addEventListener('click', event.onMenuCreateIcon);
document.getElementById('menu-edit').addEventListener('click', event.onMenuEdit);
document.getElementById('menu-cut').addEventListener('click', event.onMenuCut);
document.getElementById('menu-copy').addEventListener('click', event.onMenuCopy);
document.getElementById('menu-paste').addEventListener('click', event.onMenuPaste);
document.getElementById('menu-delete').addEventListener('click', event.onMenuDelete);
document.getElementById('menu-page-create').addEventListener('click', event.onMenuPageCreate); // Create marker modal

document.getElementById('close-marker-modal').addEventListener('click', event.onCloseMarkerModal);
document.getElementById('create-marker-modal').addEventListener('click', event.onCloseMarkerModal);
document.getElementById('create-marker-modal-content').addEventListener('click', event.onMarkerModalClick);
document.getElementById('select-icon').addEventListener('click', event.onSelectIcon);
document.getElementById('create-icon').addEventListener('click', event.onCreateIcon);
document.getElementById('add-icon').addEventListener('click', event.onAddIcon);
document.getElementById('text-input').addEventListener('input', event.onTextInputChange); // Create page modal

document.getElementById('close-page-modal').addEventListener('click', event.onClosePageModal);
document.getElementById('create-page-modal').addEventListener('click', event.onClosePageModal);
document.getElementById('create-page-modal-content').addEventListener('click', event.onPageModalClick);
document.getElementById('select-image').addEventListener('click', event.onSelectImage);
document.getElementById('page-text-input').addEventListener('input', event.onPageTextInputChange);
document.getElementById('create-page').addEventListener('click', event.onPageCreate); // Search

document.getElementById('search-field').addEventListener('input', event.onSearch);
document.getElementById('tag-search-field').addEventListener('input', event.onTagSearch);
document.getElementById('tag-select-all').addEventListener('input', event.onTagSelectAll);