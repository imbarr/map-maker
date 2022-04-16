export class Floor {
  id: string
  page: string
  name: string
  image: HTMLImageElement
  imageFile: Blob

  constructor(id: string, page: string, name: string, image: HTMLImageElement, file: Blob) {
    this.id = id
    this.page = page
    this.name = name
    this.image = image
    this.imageFile = file
  }
}