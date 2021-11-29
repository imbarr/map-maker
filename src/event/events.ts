import { getCanvas } from '../globals'

const menu = document.getElementById('contextmenu')

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
  menu.style.top = `${event.clientY}px`
  menu.style.left = `${event.clientX}px`
  menu.classList.add('visible')
}

export function closeContextMenu() {
  menu.classList.remove('visible')
}
