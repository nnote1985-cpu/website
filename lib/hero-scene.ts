import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/** An original architectural study, deliberately not a model of a saleable unit. */
export function createHeroScene(host: HTMLElement, onReady: () => void) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.65));
  renderer.setClearColor(0, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, .1, 100);
  camera.position.set(10, 7, 12);
  const target = new THREE.Vector3(0, 1.7, 0);
  const model = new THREE.Group();
  scene.add(model);
  const hemisphere = new THREE.HemisphereLight(0xf5f8ff, 0x8b9a90, 3.5);
  scene.add(hemisphere);
  const key = new THREE.DirectionalLight(0xfff1d9, 5.5);
  key.position.set(-4, 10, 6); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -8; key.shadow.camera.right = 8;
  key.shadow.camera.top = 9; key.shadow.camera.bottom = -8;
  key.shadow.normalBias = .03;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd3e5f2, 3);
  rim.position.set(6, 4, -7); scene.add(rim);
  const materials = {
    stone: new THREE.MeshStandardMaterial({ color: 0xe6e4dd, roughness: .68 }),
    edge: new THREE.MeshStandardMaterial({ color: 0xc5c4b7, roughness: .64 }),
    bronze: new THREE.MeshStandardMaterial({ color: 0x806545, roughness: .37, metalness: .52 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0x45615d, roughness: .15, metalness: .25, transparent: true, opacity: .62, side: THREE.DoubleSide }),
    green: new THREE.MeshStandardMaterial({ color: 0x496046, roughness: 1 }),
    soil: new THREE.MeshStandardMaterial({ color: 0x827768, roughness: 1 }),
    warm: new THREE.MeshStandardMaterial({ color: 0xdfbb7e, roughness: .6, emissive: 0x836024, emissiveIntensity: .14 }),
  };
  const geometries: THREE.BufferGeometry[] = [];
  const rounded = (parent: THREE.Group, w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material, radius = .035) => {
    const geo = new RoundedBoxGeometry(w,h,d,2,Math.min(radius,h/3,w/3,d/3));
    geometries.push(geo);
    const mesh = new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
  };
  const floors: THREE.Group[] = [];
  rounded(model,5.5,.18,5.5,0,-.18,0,materials.edge,.05);
  rounded(model,5.15,.12,5.15,0,-.04,0,materials.stone,.05);
  const foliageGeo=new THREE.IcosahedronGeometry(.19,1);geometries.push(foliageGeo);
  const leaf = (group: THREE.Group,x:number,y:number,z:number,scale=1) => {const mesh=new THREE.Mesh(foliageGeo,materials.green);mesh.position.set(x,y,z);mesh.scale.set(scale,scale*.9,scale);mesh.castShadow=true;group.add(mesh);};
  for(let f=0;f<5;f++){
    const group=new THREE.Group();group.position.y=f*.94;floors.push(group);model.add(group);
    const inset=f%2===0 ? 0 : .2;
    rounded(group,4.7-inset,.17,4.05,0,.13,0,materials.stone,.07);
    rounded(group,2.6,.73,2.5,0,.58,-.25,materials.glass,.015);
    rounded(group,2.5,.06,2.5,0,.9,-.25,materials.warm,.015);
    for(const x of [-1.5,1.5])for(const z of [-1.4,1.4])rounded(group,.10,.78,.10,x,.6,z,materials.bronze,.01);
    // Repeated fins, terraces and planted edges make the material read as architecture.
    for(let i=0;i<12;i++)rounded(group,.055,.71,.1,-1.32+i*.24,.59,-1.52,materials.bronze,.008);
    for(let i=0;i<9;i++)rounded(group,.08,.71,.045,-1.56,.59,-1.1+i*.27,materials.bronze,.008);
    rounded(group,3.7,.04,.04,0,.67,1.86,materials.bronze,.006);
    rounded(group,3.7,.40,.015,0,.45,1.86,materials.glass,.005);
    rounded(group,.37,.25,2.7,2.03-inset*.5,.34,-.35,materials.edge);
    rounded(group,.27,.03,2.58,2.03-inset*.5,.48,-.35,materials.soil,.006);
    for(let p=0;p<11;p++)leaf(group,2.03-inset*.5,.58,-1.45+p*.22,.72+(p%3)*.1);
    rounded(group,1.25,.24,.4,-.7,.34,1.55,materials.edge);
    for(let p=0;p<5;p++)leaf(group,-1.2+p*.24,.6,1.55,.85);
    // Bench and a small table on alternating terraces.
    if(f%2===0){rounded(group,.72,.13,.30,-.3,.34,.95,materials.warm);rounded(group,.28,.24,.28,.6,.37,1.0,materials.edge);}
  }
  rounded(model,4.5,.2,4.1,0,4.88,0,materials.stone,.08);
  rounded(model,2.7,.13,2.5,0,5.04,-.1,materials.edge,.05);
  for(let i=0;i<13;i++)rounded(model,.07,.09,2.7,-1.48+i*.245,5.25,-.1,materials.bronze,.015);
  for(let i=0;i<9;i++)leaf(model,-1.4+i*.35,5.15,-1.7,1.1);
  model.rotation.y=-.52;model.rotation.z=.025;
  const groundGeo = new THREE.PlaneGeometry(70,70);geometries.push(groundGeo);
  const groundMaterial=new THREE.ShadowMaterial({opacity:.14});
  const ground=new THREE.Mesh(groundGeo,groundMaterial);ground.rotation.x=-Math.PI/2;ground.position.y=-.32;ground.receiveShadow=true;scene.add(ground);
  let progress=0, px=0,py=0,frame=0,visible=true,disposed=false,last=performance.now();
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};
  const ro=new ResizeObserver(resize);ro.observe(host);resize();
  const draw=(now:number)=>{
    frame=0;if(disposed||!visible||document.hidden)return;
    const dt=Math.min((now-last)/1000,.04);last=now;
    const desired=-.52+px*.18+progress*1.0;
    model.rotation.y+=(desired-model.rotation.y)*Math.min(1,dt*3);
    const t=now*.00024;
    model.position.y=Math.sin(t)*.055;
    model.rotation.z=.025+Math.sin(t*.8)*.008;
    floors.forEach((floor,i)=>{floor.position.y=i*.94+Math.sin(Math.min(progress*1.6,1)*Math.PI)*i*.065;});
    camera.position.set(10-px*.6-progress*2,7+py*.35-progress*.4,12-progress*2);
    camera.lookAt(target);renderer.render(scene,camera);frame=requestAnimationFrame(draw);
  };
  const restart=()=>{if(!frame&&!disposed&&visible&&!document.hidden){last=performance.now();frame=requestAnimationFrame(draw);}};
  const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(!visible){cancelAnimationFrame(frame);frame=0;}else restart();});io.observe(host);
  document.addEventListener('visibilitychange',restart);
  const lost=(e:Event)=>{e.preventDefault();host.dataset.failed='true';cancelAnimationFrame(frame);frame=0;};renderer.domElement.addEventListener('webglcontextlost',lost);
  renderer.render(scene,camera);onReady();restart();
  return {
    update(p:number,x:number,y:number){progress=p;px=x;py=y;},
    dispose(){disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();document.removeEventListener('visibilitychange',restart);renderer.domElement.removeEventListener('webglcontextlost',lost);geometries.forEach(g=>g.dispose());Object.values(materials).forEach(m=>m.dispose());groundMaterial.dispose();renderer.dispose();renderer.domElement.remove();},
  };
}
