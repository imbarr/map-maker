import { searchCurrentValue } from './search';
import { tagSearchCurrentValue } from './tag';
export function onMarkersEdited() {
  let search = document.getElementById('search-field');
  let tagSearch = document.getElementById('tag-search-field');
  search.value = '';
  tagSearch.value = '';
  tagSearchCurrentValue();
  searchCurrentValue();
}