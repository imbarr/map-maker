import { searchCurrentValue } from './search'
import { tagSearchCurrentValue } from './tag'

export function onMarkersEdited() {
  tagSearchCurrentValue()
  searchCurrentValue()
}