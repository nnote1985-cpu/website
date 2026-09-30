import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/mychu/AppData/Local/ms-playwright/chromium-1217/chrome-win64/chrome.exe'});
try {
 const page=await browser.newPage({viewport:{width:1850,height:1030}});
 await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
 const bar=()=>page.locator('.gallery-center-track i').evaluate(e=>getComputedStyle(e).transform);
 const before=await bar();await page.waitForTimeout(900);assert.notEqual(await bar(),before);
 await page.getByRole('button',{name:'หยุดสไลด์',exact:true}).click();
 const stopped=await bar();await page.waitForTimeout(350);assert.equal(await bar(),stopped);
 assert.equal(await page.locator('.gallery-heading h1').innerText(),'BEYOND');
 assert.equal(await page.locator('.gallery-controls').count(),0);
 const travel=await page.locator('.gallery-hero').evaluate(e=>e.offsetHeight-innerHeight*1.15);
 const colors=[], opacities=[];
 for(const [name,y] of [['start',0],['middle',travel/2],['end',travel]]){
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(4000);
  opacities.push(await page.locator('.gallery-expectation').evaluate(e=>Number(getComputedStyle(e).opacity)));
  colors.push(await page.locator('.gallery-heading').evaluate(e=>getComputedStyle(e).color));
  assert.equal(await page.locator('.gallery-heading').evaluate(e=>getComputedStyle(e).opacity),'1');
  await page.screenshot({path:`artifacts/gallery-motion-${name}.png`});
 }
 assert.equal(new Set(colors).size,3);
 const lagged=await page.locator('.gallery-hero').evaluate(e=>parseFloat(e.style.getPropertyValue('--image-parallax')));
 assert.ok(lagged<154.5,'Photo should still trail the scroll target');
 await page.waitForTimeout(1100);
 const settled=await page.locator('.gallery-hero').evaluate(e=>parseFloat(e.style.getPropertyValue('--image-parallax')));
 assert.ok(settled>lagged,'Photo must continue settling after scrolling stops');
 assert.ok(await page.locator('.gallery-hero').evaluate(e=>parseFloat(e.style.getPropertyValue('--image-parallax')))>140);
 assert.equal(opacities[0],1);assert.equal(opacities[2],0);assert.ok(opacities[1]<1);
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(4000);
 assert.equal(await page.locator('.gallery-heading').evaluate(e=>getComputedStyle(e).color),colors[0]);
 await page.getByLabel('เลือกภาพสไลด์',{exact:true}).selectOption('5');
 assert.equal(await page.locator('.gallery-caption-content').evaluate(e=>getComputedStyle(e).animationName),'gallery-caption-enter');
 for(const [width,height] of [[1850,1030],[1440,750],[390,844]]){
  await page.setViewportSize({width,height});await page.waitForTimeout(300);
  const rects=await page.evaluate(()=>{
   const c=document.querySelector('.gallery-caption').getBoundingClientRect();
   const h=document.querySelector('.gallery-heading').getBoundingClientRect();
   return {captionBottom:c.bottom,headingTop:h.top,overflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert.ok(rects.captionBottom<rects.headingTop,JSON.stringify({width,height,...rects}));
  assert.equal(rects.overflow,false);
 }
 await page.evaluate(()=>scrollTo({top:document.querySelector('.gallery-hero').offsetHeight-innerHeight*1.15,behavior:'instant'}));await page.waitForTimeout(4000);
 await page.screenshot({path:'artifacts/gallery-motion-mobile-end.png'});
 const detail=await page.locator('.gallery-footnote').boundingBox();
 const wordmark=await page.locator('.gallery-heading').boundingBox();
 assert.ok(detail.y+detail.height<wordmark.y,'Mobile editorial copy must not overlap BEYOND');
 assert.equal(await page.locator('.gallery-expectation').innerText(),'Expectation');
 console.log(JSON.stringify({passed:true,colors,checks:['center progress moves and pauses','wordmark stays visible and changes color reversibly','caption animates on selection','no caption-heading overlap at three viewport sizes']}));
} finally {await browser.close();}
