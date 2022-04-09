export class Icon {
  constructor(id, path) {
    this.id = id;
    this.custom = false;
    let image = new Image();
    image.src = path;
    this.image = image;
    fetch(path).then(r => r.blob()).then(r => this.imageFile = r);
  }

}