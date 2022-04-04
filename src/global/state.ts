import { Marker } from './map/marker'

export class State {
  filteredMarkers: Marker[]

  constructor() {
    this.filteredMarkers = []
  }
}