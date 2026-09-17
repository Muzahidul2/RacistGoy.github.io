const CACHE="road-to-doomsday-v1";
const CORE=["./","./index.html","./manifest.webmanifest","./favicon.svg","./icons_pwa/icon-32.png","./icons_pwa/icon-180.png","./icons_pwa/icon-192.png","./icons_pwa/icon-512.png","./icons_pwa/icon-512-maskable.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET") return;
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match("./index.html"))));
});
