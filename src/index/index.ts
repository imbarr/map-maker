import { Map } from '../global/map/map'
import { global } from '../global/global'

let img = new Image()
img.src = '/public/stardew.jpeg'

let map = new Map(img, [
  {icon: 'message', text:'I am message', tags: [], coords: { x: 100, y: 100}},
  {icon: 'enemy', text:'I am enemy', tags: ['enemy', 'other'], coords: { x: 200, y: 300}},
  {icon: 'enemy', text:'I am enemy', tags: ['other'], coords: { x: 300, y: 400}}
])

global.setMap(map)
