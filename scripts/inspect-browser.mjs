import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser=await chromium.launch({headless:true,executablePath:'C:/Users/mychu/AppData/Local/ms-playwright/chromium-1217/chrome-win64/chrome.exe',args:['--enable-unsafe-swiftshader']});
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto(base,{waitUntil:'networkidle'});
 await mkdir('artifacts',{recursive:true});
 await page.waitForTimeout(1500);
 console.log(await page.locator('.gallery-hero').evaluate(el=>({rect:el.getBoundingClientRect().toJSON()})));
 await page.screenshot({path:'artifacts/desktop-hero.png'});
 for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=850){await page.evaluate(v=>scrollTo({top:v,behavior:'instant'}),y);await page.waitForTimeout(90);}
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(1000);
 await page.screenshot({path:'artifacts/desktop-full.png',fullPage:true});
 await writeFile('artifacts/dom.html',await page.content());
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await mobile.goto(base,{waitUntil:'networkidle'});await mobile.screenshot({path:'artifacts/mobile-hero.png'});
 console.log('screenshots saved');
}finally{await browser.close();}
