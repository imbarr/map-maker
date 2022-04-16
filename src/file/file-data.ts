import { Marker } from '../global/map/marker'

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
  pages: FilePage[]
}

export class FilePage {
  id: string
  name: string
  floors: FileFloor[]
}

export class FileFloor {
  id: string
  name: string
  image: string
}
