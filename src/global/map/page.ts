export class Page {
  id: string
  name: string
  image: HTMLImageElement

  constructor(id: string, name: string, image: HTMLImageElement) {
    this.id = id
    this.name = name
    this.image = image
  }
}