import { Map } from '../global/map/map'
import { global } from '../global/global'

let img = new Image()
img.src = '/public/stardew.jpeg'

let map = new Map(img, [
  {icon: 'message', text:'I am message', coords: { x: 100, y: 100}},
  {icon: 'enemy', text:'I am enemy', coords: { x: 200, y: 300}}
])

global.setMap(map)
