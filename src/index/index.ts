import { Map } from '../global/map/map'
import { global } from '../global/global'
import { Marker } from '../global/map/marker'
import { Page } from '../global/map/page'

let img1 = new Image()
img1.src = '/public/stardew.jpeg'

let img2 = new Image()
img2.src = '/public/minevalley.jpg'

let map = new Map([
  new Marker('message', '1', 'I am message', { x: 100, y: 100}, ['msg']),
  new Marker('enemy', '1', 'I am enemy', { x: 200, y: 200}, ['enemy']),
  new Marker('enemy', '2', 'I am enemy', { x: 300, y: 300}, [])
], [
  new Page('1', 'Stardew valley', img1),
  new Page('2', 'Valley of mines', img2),
])

global.setMap(map)
