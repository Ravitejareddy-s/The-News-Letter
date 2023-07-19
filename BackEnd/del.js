const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');
console.time("codeExecution");

const uniqueSet = new Set([
  'https://images.moneycontrol.com/images/common/headfoot/network18_33x33.png',
  'https://images.moneycontrol.com/images/common/headfoot/logo.png?impolicy=mchigh',
  'https://images.moneycontrol.com/images/common/header/mc_pro_logo_181x28.png?impolicy=mchigh',
  'https://images.moneycontrol.com/images/common/headfoot/moneycontrol-logo_234x48.png',
  'https://images.moneycontrol.com/images/common/headfoot/gc_logo_57x22.png',
  'https://images.moneycontrol.com/images/common/headfoot/MC_Pro_Logo.png',
  'https://www.moneycontrol.com//stat1.moneycontrol.com/mcnews//images/grey_bg.gif',
  'https://images.moneycontrol.com/static-mcnews/2023/01/online-gaming.jpg?impolicy=website&width=168&height=118',
  'https://images.moneycontrol.com/static-mcnews/2020/06/recession-378x213.jpg?impolicy=website&width=168&height=118',
  'https://images.moneycontrol.com/images/common/headfoot/bsi-cert2b.png',
  'https://images.moneycontrol.com/images/ftpopup/moneyloginlogo.png',
  'https://images.moneycontrol.com/images/ftpopup/icon2.png',
  'https://images.moneycontrol.com/images/ftpopup/manymore.jpg'
]);

let imggg;
let max = 0;

async function fetchImages() {
  for (let i of uniqueSet) {
    try {
      const response = await fetch(i);
      const buffer = await response.buffer();
      const image = await loadImage(buffer);
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      const area = canvas.width * canvas.height;
      console.log(i)
      console.log(area);

      if (max < area) {
        max = area;
        imggg = i;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  console.log(imggg);
  console.timeEnd("codeExecution");
}

fetchImages();
