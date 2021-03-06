import { Marker } from './map/marker'
import { Icon } from './icon'
import { IconsList } from './constants/icons'
import { global } from './global'
import { PageState } from './page-state'

export class State {
  filteredMarkers: Marker[]
  icons: Icon[]
  tags: string[]
  selectedTags: string[]
  copyingMarker: string
  cuttingMarker: string
  editingMarker: string
  selectedMarker: string
  selectedPage: string
  selectedFloor: string
  selectedImage: HTMLImageElement
  selectedImageFile: File
  pageStates: PageState[]
  createIconSelected: Icon
  createJumpIcon: Icon
  createJumpFloor: string
  menuSelectedPage: string
  menuSelectedFloor: string
  menuCreatePage: boolean
  selectedJump: string

  constructor() {
    this.filteredMarkers = []
    this.tags = []
    this.selectedTags = []
    this.icons = [...IconsList]
    this.pageStates = []
  }

  addNewTags(tags: string[]) {
    let newTags = tags.filter(t => !this.tags.includes(t))
    this.tags.push(...newTags)
    this.tags.sort()
  }

}