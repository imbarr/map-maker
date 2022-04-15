import { searchCurrentValue } from './search'
import { tagSearchCurrentValue } from './tag'
import { populatePageList } from './page'
import { global } from '../global/global'
import { populateFloorList } from './floor'

export function onMarkersEdited() {
  let search = document.getElementById('search-field') as HTMLInputElement
  let tagSearch = document.getElementById('tag-search-field') as HTMLInputElement
  search.value = ''
  tagSearch.value = ''
  tagSearchCurrentValue()
  searchCurrentValue()
}

export function onSetMap() {
  global.state.tags = []
  global.state.selectedTags = []
  global.state.selectedPage = global.map.pages[0].id
  global.state.selectedFloor = global.map.pages[0].floors[0].id
  global.map.markers.forEach(m => global.state.addNewTags(m.tags))
  onMarkersEdited()
  populatePageList()
  populateFloorList()
  global.canvas.loadMap()
}
