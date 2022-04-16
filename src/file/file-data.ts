import { Marker } from '../global/map/marker'
import { Page } from '../global/map/page'

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
}

export class FileFloor {
  id: string
  page: string
  name: string
  image: string
}
