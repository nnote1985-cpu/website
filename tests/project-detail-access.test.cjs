const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup}=require('react-dom/server');
function load(file, mocks) {
 const output=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
 const exports={};vm.runInNewContext(output,{exports,require:n=>n in mocks?mocks[n]:require(n)});return exports;
}
test('disabled project cards retain content but remove every link',()=>{
 const Card=load('components/home/ProjectCard.tsx',{'next/link':({children,...p})=>React.createElement('a',p,children),'next/image':()=>null,'@/lib/utils':{getStatusLabel:()=> 'Active'},'@/lib/projectUrl':{projectUrl:s=>'/projects/'+s}}).default;
 const project={id:'test',slug:'test',name:'Project Test',priceMin:1000000};
 const enabled=renderToStaticMarkup(React.createElement(Card,{project}));
 const disabled=renderToStaticMarkup(React.createElement(Card,{project:{...project,details_enabled:false}}));
 assert.equal((enabled.match(/<a /g)||[]).length,3);
 assert.equal((disabled.match(/<a /g)||[]).length,0);
 assert.match(disabled,/Project Test/);assert.match(disabled,/1,000,000/);
});
test('switch API requires auth, validates input and preserves other settings',async()=>{
 let session=null, settings={phone:['123'],projectDetailAccess:{other:false}},paths=[];
 const db={from(table){return {select(){return this},eq(){return this},async single(){return {data:table==='projects'?{id:'p1',slug:'the-celine-bang-chan'}:{data:settings}}},update(value){settings=value.data;return {eq(){return this},select:async()=>({data:[{id:1}]})}}}}};
 const route=load('app/api/projects/[id]/detail-access/route.ts',{'next/server':{NextResponse:{json:(body,opts)=>({body,status:opts?.status||200})}},'next/cache':{revalidatePath:p=>paths.push(p)},'@/lib/auth':{getSession:async()=>session},'@/lib/supabase':{supabaseAdmin:db},'@/lib/projectUrl':{projectUrl:()=>'/theceline'}});
 const call=enabled=>route.PATCH({json:async()=>({enabled})},{params:Promise.resolve({id:'p1'})});
 assert.equal((await call(false)).status,401);session={id:'admin'};
 assert.equal((await call('false')).status,400);
 assert.equal((await call(false)).status,200);assert.equal(settings.projectDetailAccess.p1,false);assert.equal(settings.projectDetailAccess.other,false);assert.equal(settings.phone[0],'123');assert.ok(paths.includes('/theceline'));assert.ok(paths.includes('/projects'));
 assert.equal((await call(true)).status,200);assert.equal(settings.projectDetailAccess.p1,true);
});
