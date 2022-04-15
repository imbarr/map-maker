export class Map {
  constructor(markers, pages) {
    this.pages = pages;
    this.markers = markers;
  }

  getAllFloors() {
    return this.pages.flatMap(p => p.floors);
  }

}