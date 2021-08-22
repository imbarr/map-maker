import { GameMap } from './item/game-map'
import { getCanvas } from './globals'

export function onSetImage() {
  let input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'

  input.onchange = event => {
    let file = (event.target as HTMLInputElement).files[0]

    let img = new Image()
    img.onload = () => {
      let gameMap = new GameMap()
      gameMap.setImage(img.src)
      let size = {
        width: img.naturalWidth,
        height: img.naturalHeight
      }

      let canvas = getCanvas()
      canvas.setMap(gameMap, size)
      canvas.render()
    }

    img.onerror = () => {
      alert('Invalid image')
    }

    img.src = URL.createObjectURL(file);
  }

  input.click()
}