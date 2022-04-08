import { global } from '../global/global'

export function populatePageList() {
  let list = document.getElementById('page-list')
  list.innerHTML = ''

  global.map.pages.forEach(p => {
    let elem = document.createElement('li')
    elem.innerHTML = `${p.name} <div class="page-bleep hide" data-id="${p.name}"></div>`

    if (global.state.selectedPage === p.name) {
      elem.classList.add('page-selected')
    }

    elem.addEventListener('click', () => {
      Array.from(list.children).forEach(c => c.classList.remove('page-selected'))

      global.state.selectedPage = p.name
      elem.classList.add('page-selected')

      global.canvas.loadMap()
    })

    list.appendChild(elem)
  })
}
