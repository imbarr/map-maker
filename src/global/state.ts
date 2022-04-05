import { Marker } from './map/marker'
import { Icon } from './icon'
import { IconsList } from './constants/icons'

export class State {
  filteredMarkers: Marker[]
  icons: Icon[]
  createIconSelected: Icon

  constructor() {
    this.filteredMarkers = []
    this.icons = IconsList
  }
}