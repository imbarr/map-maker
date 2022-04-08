import { global } from '../global/global'

export function onPageInputChange() {
  let text = document.getElementById('page-text-input') as HTMLInputElement
  let button = document.getElementById('create-page') as HTMLButtonElement
  let selectedImage = global.state.selectedImage
  let unique = global.map.pages.every(p => p.name !== text.value)

  button.disabled = !(text.value && selectedImage && unique);
}