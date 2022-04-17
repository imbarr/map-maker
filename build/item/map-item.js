export class MapItem {
  constructor() {
    this.items = [];
  }

  setImage(image) {
    this.image = image;
  }

  addItem(item) {
    this.items.push(item);
  }

  render(canvas) {
    let elem = this.getElement();
    canvas.html.appendChild(elem);
    this.items.forEach(marker => marker.render(canvas));
  }

  getElement() {
    let template = document.createElement('template');
    template.innerHTML = `<img class="background-image"
                               src="${this.image}"
                               alt="not found"/>`;
    return template.content.firstChild;
  }

}