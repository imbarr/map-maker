import { Map } from '../global/map/map';
import { global } from '../global/global';
import { Marker } from '../global/map/marker';
import { Page } from '../global/map/page';
import { Floor } from '../global/map/floor';
let img1 = new Image();
img1.src = '/public/stardew.jpeg';
let img2 = new Image();
img2.src = '/public/minevalley.jpg';
let map = new Map([new Marker('person', '1', 'I am message', '', {
  x: 100,
  y: 100
}, ['msg']), new Marker('scull', '2', 'I am enemy', '', {
  x: 200,
  y: 200
}, ['enemy']), new Marker('scull', '3', 'I am enemy', '', {
  x: 300,
  y: 300
}, [])], [new Page('1', 'Stardew valley'), new Page('2', 'Valley of mines')], [new Floor('1', '1', 'Floor 1', img1, null), new Floor('2', '1', 'Floor 2', img2, null), new Floor('3', '2', 'Floor 1', img1, null), new Floor('4', '2', 'Floor 2', img2, null)], []);
global.setMap(map);