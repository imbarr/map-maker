import { global } from '../global/global'
import { version } from './version'
import { FileIcon, FileData, FileFloor } from './file-data'
import { IconsList } from '../global/constants/icons'
import { Page } from '../global/map/page'
import { Floor } from '../global/map/floor'
import { Map } from '../global/map/map'

export async function getFile(): Promise<FileData> {
  let icons = global.state.icons.filter(i => i.custom)
  let fileIcons: FileIcon[] = []
  for (let i = 0; i < icons.length; i++) {
    let icon = icons[i]
    let base64 = await blobToDataURL(icon.imageFile)
    fileIcons.push({ id: icon.id, image: base64 })
  }

  let fileFloors: FileFloor[] = []
  for (let j = 0; j < global.map.floors.length; j++) {
    let floor = global.map.floors[j]
    let base64 = await blobToDataURL(floor.imageFile)
    fileFloors.push({ id: floor.id, page: floor.page, name: floor.name, image: base64})
  }

  return {
    version: version,
    icons: fileIcons,
    map: {
      markers: global.map.markers,
      pages: global.map.pages,
      floors: fileFloors
    }
  }
}

export async function setFile(data: FileData) {
  global.state.icons = IconsList

  for (let i = 0; i < data.icons.length; i++) {
    let icon = data.icons[i]
    let file = dataURLtoFile(icon.image)
    let img = new Image()
    img.src = URL.createObjectURL(file)

    await img.decode()
    global.state.icons.push({ id: icon.id, image: img, imageFile: file, custom: true })
  }

  global.map = new Map(data.map.markers, data.map.pages, [], [])

  for (let j = 0; j < data.map.floors.length; j++) {
    let floor = data.map.floors[j]
    let file = dataURLtoFile(floor.image)
    let img = new Image()
    img.src = URL.createObjectURL(file)

    await img.decode()

    global.map.floors.push(new Floor(floor.id, floor.page, floor.name, img, file))
  }

  for (let j = 0; j < data.map.pages.length; j++) {
    let page = data.map.pages[j]
    global.state.pageStates.push({
      id: page.id,
      selectedFloor: global.map.floors.find(f => f.page === page.id).id,
      scrollLeft: 0,
      scrollTop: 0,
      scale: 1
    })
  }
}

function dataURLtoFile(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], 'filename', {type:mime});
}

function blobToDataURL(blob: Blob): Promise<string> {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result as string);
    }
  })
}
