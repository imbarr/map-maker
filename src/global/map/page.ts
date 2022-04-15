import { Floor } from './floor'

export class Page {
  id: string
  name: string
  floors: Floor[]

  constructor(id: string, name: string, floors: Floor[]) {
    this.id = id
    this.name = name
    this.floors = floors
  }
}