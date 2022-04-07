import { searchCurrentValue } from './search'
import { tagSearchCurrentValue } from './tag'

export function onMarkersEdited() {
  let search = document.getElementById('search-field') as HTMLInputElement
  let tagSearch = document.getElementById('tag-search-field') as HTMLInputElement
  search.value = ''
  tagSearch.value = ''
  tagSearchCurrentValue()
  searchCurrentValue()
}