const fs=require('fs'),path=require('path'),Module=require('module'),ts=require('typescript'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'), original=Module._load;
let missing=false,missingNews=false,fail=false, calls=[];
const projectRows=[{id:'a',slug:'elysium-phahol-59',created_at:'2020-01-01',updated_at:'2026-09-28'},{id:'b',slug:'hidden',updated_at:'2026-09-28'},{id:'c',slug:'no-date',created_at:'2020-01-01',updated_at:null}];
Module._load=function(id,parent,main){
 if(id==='@/lib/supabase')return {supabaseAdmin:{from(table){let columns;return {select(c){columns=c;calls.push(c);return this},async eq(){if(fail)return {data:null,error:{code:'XX'}};if(table==='projects'){if(missing&&columns.includes('updated_at'))return {data:null,error:{code:'42703'}};return {data:projectRows.map(p=>missing?{id:p.id,slug:p.slug}:p),error:null}}if(missingNews&&columns.includes('updated_at'))return {data:null,error:{code:missingNews}};if(missingNews)return {data:[{slug:'legacy',published_at:'2026-09-27'}],error:null};return {data:[{slug:'valid',updated_at:'2026-09-29',published_at:'2020-01-01'},{slug:'invalid',updated_at:'bad'},{slug:'future',updated_at:'2999-01-01'}],error:null}}}}}};
 if(id==='@/lib/projectAccess')return {getProjectDetailAccess:async()=>({b:false})};
 if(id.startsWith('@/'))id=path.join(root,id.slice(2));
 return original.call(this,id,parent,main);
};
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,f);
(async()=>{const sitemap=require('../app/sitemap.ts').default;
 let rows=await sitemap();assert(!rows.some(r=>r.url.endsWith('/hidden')));assert.equal(rows.find(r=>r.url.endsWith('/elysium59')).lastModified.toISOString(),'2026-09-28T00:00:00.000Z');
 for(const suffix of ['.th','/projects/no-date','/news/invalid','/news/future'])assert(!rows.find(r=>r.url.endsWith(suffix)).lastModified);
 missing=true;rows=await sitemap();assert(rows.some(r=>r.url.endsWith('/elysium59')));assert(!rows.find(r=>r.url.endsWith('/elysium59')).lastModified);assert(calls.includes('id, slug'));
 for(const code of ['42703','PGRST204']){missingNews=code;rows=await sitemap();assert.equal(rows.find(r=>r.url.endsWith('/news/legacy')).lastModified.toISOString(),'2026-09-27T00:00:00.000Z');}assert(calls.includes('slug, published_at'));assert.equal(require('../app/sitemap.ts').dynamic,'force-dynamic');
 fail=true;await assert.rejects(sitemap);console.log('PASS sitemap dates, missing-column fallback, legacy news with both missing-column codes, dynamic route, disabled projects, query errors');
})().catch(e=>{console.error(e);process.exitCode=1});
