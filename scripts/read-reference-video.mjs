import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const source = process.argv[2];
const dir = 'artifacts/reference-video';
await mkdir(dir,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/mychu/AppData/Local/ms-playwright/chromium-1217/chrome-win64/chrome.exe'});
try {
 const page=await browser.newPage();
 await page.setContent('<video muted></video>');
 const data=(await readFile(source)).toString('base64');
 const info=await page.evaluate(async base64=>{
  const video=document.querySelector('video');
  video.src='data:video/mp4;base64,'+base64;
  await new Promise((resolve,reject)=>{video.onloadeddata=resolve;video.onerror=()=>reject(new Error('Video decode error '+video.error?.code));});
  return {duration:video.duration,width:video.videoWidth,height:video.videoHeight};
 },data);
 console.log(JSON.stringify(info));
 const count=Number(process.argv[3]) || Math.min(12,Math.ceil(info.duration));
 for(let i=0;i<count;i++){
  const time=Math.min(info.duration-.1,(i+.3)*info.duration/count);
  const frame=await page.evaluate(async time=>{
   const video=document.querySelector('video');
   await new Promise(resolve=>{video.onseeked=resolve;video.currentTime=time;});
   const c=document.createElement('canvas');c.width=1100;c.height=Math.round(1100*video.videoHeight/video.videoWidth);
   c.getContext('2d').drawImage(video,0,0,c.width,c.height);
   return c.toDataURL('image/jpeg',.85).split(',')[1];
  },time);
  await writeFile(`${dir}/frame-${String(i+1).padStart(2,'0')}.jpg`,Buffer.from(frame,'base64'));
 }
 await writeFile(`${dir}/metadata.json`,JSON.stringify({...info,count},null,2));
 console.log(`Extracted ${count} frames`);
} finally {await browser.close();}
