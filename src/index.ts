const imgPath = '../public/'

function test() {
  let map = new GameMap()
  let marker = new Marker(imgPath + 'message.svg', { x: 350, y: 300 })

  let c = document.getElementById('canvas')
  let canvas = new Canvas(c, map)

  canvas.setImage(imgPath + 'stardew.jpeg')
  canvas.addMarker(marker)
}

test()
