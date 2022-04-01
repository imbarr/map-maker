import { getCanvas } from '../globals'
import { Marker } from '../item/marker'

let canvas = getCanvas()
let img = new Image()
img.src = '/public/stardew.jpeg'
canvas.setImage(img)

canvas.map.addMarker(new Marker('message', 'I am message', { x: 100, y: 100}))
canvas.map.addMarker(new Marker('enemy', 'I am enemy', { x: 200, y: 300}))

canvas.render()
