import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/mychu/AppData/Local/ms-playwright/chromium-1217/chrome-win64/chrome.exe'});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});
 const read=()=>page.locator('.gallery-hero').evaluate(e=>({scroll:scrollY,frame:parseFloat(e.style.getPropertyValue('--frame-inset')),photo:parseFloat(e.style.getPropertyValue('--image-parallax'))}));
 await page.evaluate(()=>scrollTo({top:600,behavior:'instant'}));await page.waitForTimeout(100);
 const early=await read();await page.waitForTimeout(900);const later=await read();
 assert.equal(early.scroll,600);assert.equal(later.scroll,600);
 assert.ok(early.frame<later.frame*.5,'Frame must visibly trail scroll input');
 assert.ok(early.photo<later.photo*.5,'Photo must visibly trail scroll input');
 assert.ok(later.frame<4.1,'600px scroll should only partly shrink the scene');
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(4200);
 assert.equal((await read()).frame,0);
 console.log(JSON.stringify({passed:true,early,later}));
}finally{await browser.close();}
