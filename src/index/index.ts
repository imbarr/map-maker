import { Map } from '../global/map/map'
import { global } from '../global/global'
import { Marker } from '../global/map/marker'
import { Page } from '../global/map/page'

let img1 = new Image()
img1.src = '/public/stardew.jpeg'

let img2 = new Image()
img2.src = '/public/minevalley.jpg'

let map = new Map([
  new Marker('message', 'Stardew valley', 'I am message', { x: 100, y: 100}, ['msg']),
  new Marker('enemy', 'Valley of mines', 'I am enemy', { x: 200, y: 200}, ['enemy']),
  new Marker('enemy', 'Valley of mines', 'I am enemy', { x: 300, y: 300}, [])
], [
  new Page('Stardew valley', img1),
  new Page('Valley of mines', img2),
])

global.setMap(map)
