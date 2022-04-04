export class MapItem {
  constructor() {
    this.markers = [];
  }

  setImage(image) {
    this.image = image;
  }

  addMarker(marker) {
    this.markers.push(marker);
  }

  render(canvas) {
    let elem = this.getElement();
    canvas.html.appendChild(elem);
    this.markers.forEach(marker => marker.render(canvas));
  }

  getElement() {
    let template = document.createElement('template');
    template.innerHTML = `<img class="background-image"
                               src="${this.image}"
                               alt="not found"/>`;
    return template.content.firstChild;
  }

}