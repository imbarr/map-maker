
function test() {
  let image = 'https://steamuserimages-a.akamaihd.net/ugc/547557414802664989/2437A282C43F60554DE44956A3463424C8426947/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
  let map = new GameMap()
  let c = document.getElementById('canvas')
  let canvas = new Canvas(c, map)
  map.setCanvas(canvas)

  canvas.setImage(image)
}

test()
