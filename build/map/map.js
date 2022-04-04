export class Map {
  constructor(image, markers) {
    if (markers === undefined) {
      markers = [];
    }

    this.image = image;
    this.markers = markers;
    this.filteredMarkers = markers;
  }

}