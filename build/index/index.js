import { Map } from '../global/map/map';
import { global } from '../global/global';
import { Marker } from '../global/map/marker';
let img = new Image();
img.src = '/public/stardew.jpeg';
let map = new Map(img, [new Marker('message', 'I am message', {
  x: 100,
  y: 100
}, ['msg']), new Marker('enemy', 'I am enemy', {
  x: 200,
  y: 200
}, ['enemy']), new Marker('enemy', 'I am enemy', {
  x: 300,
  y: 300
}, [])]);
global.setMap(map);