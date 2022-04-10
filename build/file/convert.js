import { global } from '../global/global';
import { version } from './version';
import { IconsList } from '../global/constants/icons';
import { Page } from '../global/map/page';
export async function getFile() {
  let icons = global.state.icons.filter(i => i.custom);
  let fileIcons = [];

  for (let i = 0; i < icons.length; i++) {
    let icon = icons[i];
    let base64 = await blobToDataURL(icon.imageFile);
    fileIcons.push({
      id: icon.id,
      image: base64
    });
  }

  let filePages = [];
  let pages = global.map.pages;

  for (let i = 0; i < pages.length; i++) {
    let page = pages[i];
    let base64 = await blobToDataURL(page.imageFile);
    filePages.push({
      id: page.id,
      name: page.name,
      image: base64
    });
  }

  return {
    version: version,
    icons: fileIcons,
    map: {
      markers: global.map.markers,
      pages: filePages
    }
  };
}
export async function setFile(data) {
  global.state.icons = IconsList;

  for (let i = 0; i < data.icons.length; i++) {
    let icon = data.icons[i];
    let file = dataURLtoFile(icon.image);
    let img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();
    global.state.icons.push({
      id: icon.id,
      image: img,
      imageFile: file,
      custom: true
    });
  }

  global.map = {
    markers: data.map.markers,
    pages: []
  };

  for (let i = 0; i < data.map.pages.length; i++) {
    let page = data.map.pages[i];
    let file = dataURLtoFile(page.image);
    let img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();
    let p = new Page(page.id, page.name, img, file);
    global.map.pages.push(p);
    global.state.pageStates.push({
      id: p.id,
      scrollLeft: 0,
      scrollTop: 0,
      scale: 1
    });
  }
}

function dataURLtoFile(dataurl) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], 'filename', {
    type: mime
  });
}

function blobToDataURL(blob) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}