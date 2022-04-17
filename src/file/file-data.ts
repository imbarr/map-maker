import { Marker } from '../global/map/marker'
import { Page } from '../global/map/page'
import { Jump } from '../global/map/jump'

export class FileData {
  version: string
  icons: FileIcon[]
  map: FileMap
}

export class FileIcon {
  id: string
  image: string
}

export class FileMap {
  markers: Marker[]
  pages: Page[]
  floors: FileFloor[]
  jumps: Jump[]
}

export class FileFloor {
  id: string
  page: string
  name: string
  image: string
}
