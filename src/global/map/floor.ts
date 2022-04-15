export class Floor {
  id: string
  name: string
  image: HTMLImageElement
  imageFile: Blob

  constructor(id: string, name: string, image: HTMLImageElement, file: Blob) {
    this.id = id
    this.name = name
    this.image = image
    this.imageFile = file
  }
}