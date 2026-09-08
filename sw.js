const CACHE_NAME = 'so-tu-vung-ielts-v2';
const ASSETS_TO_CACHE = [
  './ielts-vocab-band-4-5.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for our own files, so content updates show up immediately.
// Falls back to cache only when offline. Everything else (fonts, TTS, Telegram API) goes straight to network.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isOwnFile = ASSETS_TO_CACHE.some((path) => url.pathname.endsWith(path.replace('./', '')));
  if (!isOwnFile) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
