import * as event from './events';
document.getElementById('container').addEventListener('contextmenu', event.onOpenContextMenu);
document.getElementById('container').addEventListener('click', event.closeContextMenu);
document.getElementById('workspace').addEventListener('scroll', event.onScroll); // Menu

document.getElementById('file-dropdown-button').addEventListener('click', event.onFileMenu);
document.getElementById('file-dropdown').addEventListener('click', event.onFileClick);
document.getElementById('set-image').addEventListener('click', event.onSetImage);
document.getElementById('file-save').addEventListener('click', event.onSave);
document.getElementById('file-load').addEventListener('click', event.onLoad); // Context menu

document.getElementById('contextmenu').addEventListener('click', event.closeContextMenu);
document.getElementById('menu-create-icon').addEventListener('click', event.onMenuCreateIcon);
document.getElementById('menu-edit').addEventListener('click', event.onMenuEdit);
document.getElementById('menu-cut').addEventListener('click', event.onMenuCut);
document.getElementById('menu-copy').addEventListener('click', event.onMenuCopy);
document.getElementById('menu-paste').addEventListener('click', event.onMenuPaste);
document.getElementById('menu-delete').addEventListener('click', event.onMenuDelete);
document.getElementById('menu-page-create').addEventListener('click', event.onMenuPageCreate);
document.getElementById('menu-page-edit').addEventListener('click', event.onMenuPageEdit);
document.getElementById('menu-floor-create').addEventListener('click', event.onMenuFloorCreate);
document.getElementById('menu-floor-edit').addEventListener('click', event.onMenuFloorEdit);
document.getElementById('menu-jump-create').addEventListener('click', event.onMenuJumpCreate);
document.getElementById('menu-jump-delete').addEventListener('click', event.onMenuJumpDelete); // Create marker modal

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
document.getElementById('create-page').addEventListener('click', event.onPageCreate); // Create jump modal

document.getElementById('close-jump-modal').addEventListener('click', event.onCloseJumpModal);
document.getElementById('create-jump-modal').addEventListener('click', event.onCloseJumpModal);
document.getElementById('create-jump-modal-content').addEventListener('click', event.onJumpModalClick);
document.getElementById('create-jump').addEventListener('click', event.onJumpCreate);
document.getElementById('create-jump-select-icon').addEventListener('click', event.onJumpSelectIcon);
document.getElementById('create-jump-select-floor').addEventListener('click', event.onJumpSelectFloor); // Search

document.getElementById('search-field').addEventListener('input', event.onSearch);
document.getElementById('tag-search-field').addEventListener('input', event.onTagSearch);
document.getElementById('tag-select-all').addEventListener('input', event.onTagSelectAll);