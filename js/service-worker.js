const CACHE_NAME = "vd-pwa-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/about.html",
  "/projects.html",
  "/css/style.css",
  "/js/main.js",
  "/assets/picture/No Image.png",
  "/assets/picture/favicon.png",
  "/assets/picture/Porfile Pic.JPG",
  "/assets/scoll-pic/css.png",
  "/assets/scoll-pic/database.png",
  "/assets/scoll-pic/html.png",
  "/assets/scoll-pic/js.png",
  "/assets/scoll-pic/java.png",
  "/assets/scoll-pic/linux.png",
  "/js/fetch_link.js",
  "/js/hero-effects 1.js",
  "/js/hero-effects.js",
  "/js/lang.js",
  "/js/load-contacts.js",
  "/js/pdf.js",
  "/js/projects-magnet.js",
  "/js/service-worker.js",
  "/js/typing.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
