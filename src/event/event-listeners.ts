import { onSetImage, openContextMenu, closeContextMenu } from './events'

document.getElementById('set-image').addEventListener('click', onSetImage)
document.getElementById('canvas').addEventListener('contextmenu', openContextMenu)
document.getElementById('canvas').addEventListener('click', closeContextMenu)