type Size = {
  width: number
  height: number
}

class GameMap {
  image: string
  canvas: Canvas

  setCanvas(canvas: Canvas) {
    this.canvas = canvas
  }

  setImage(image: string): Size {
    this.image = image
    this.canvas.html.innerHTML = `<img class="background-image"
                                       src="${this.image}"
                                       alt="not found"/>`

    let images = document.getElementsByClassName('background-image')
    let img = images[0] as HTMLImageElement

    return {
      width: img.naturalWidth,
      height: img.naturalHeight
    }
  }

  render() {
    this.canvas.html.innerHTML = `<img class="background-image"
                                       src="${this.image}"
                                       alt="not found"/>`
  }
}
