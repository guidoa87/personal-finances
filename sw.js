const CACHE="personal-finances-v2";
const APP_SHELL=["/personal-finances/","/personal-finances/index.html","/personal-finances/manifest.json","/personal-finances/icons/icon-180.png","/personal-finances/icons/icon-512.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)));self.skipWaiting();});
self.addEventListener("activate",event=>{event.waitUntil(self.clients.claim());});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;
  event.respondWith(fetch(event.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(event.request,copy)).catch(()=>{});return r;}).catch(()=>caches.match(event.request)));
});
