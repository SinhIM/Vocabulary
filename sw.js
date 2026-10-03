/* Service worker cho app IELTS Vocabulary Notebook (file index.html ở gốc repo).

   v3 — 03/10/2026, sửa 3 việc:
   1. Danh sách cache cũ trỏ tới './ielts-vocab-band-4-5.html' — file đã đổi tên thành
      index.html. cache.addAll() gặp một file 404 là reject toàn bộ, nên service worker
      KHÔNG cài được và app không hề chạy offline dù đã khai là PWA.
   2. Giờ lưu từng file riêng: một file lỗi cũng không làm hỏng cả lần cài.
   3. Chỉ nhận file của chính app này, nằm ngay dưới thư mục gốc. Mọi thư mục con
      (ví dụ english-vocab-4skills/ — app từ vựng của hai con) đi thẳng ra mạng,
      service worker không can thiệp.
*/
const CACHE_NAME = 'so-tu-vung-ielts-v3';

/* File của app này, tên tương đối so với thư mục gốc của scope. */
const SHELL_FILES = ['index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];

/* Dùng fetch + put thay cho cache.add/addAll: tương thích rộng hơn và lỗi lẻ không lan. */
async function cacheOne(cache, path) {
  try {
    const res = await fetch(new Request(path, { cache: 'reload' }));
    if (res && res.ok) await cache.put(path, res);
    else console.warn('[sw] bo qua', path, res && res.status);
  } catch (err) {
    console.warn('[sw] khong tai duoc', path, err);
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(['./'].concat(SHELL_FILES).map((p) => cacheOne(cache, p)));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

/* true chỉ khi URL là một file của app này, nằm ngay dưới thư mục gốc của scope. */
function isOwnFile(url, scope) {
  if (url.origin !== scope.origin) return false;
  if (url.pathname.indexOf(scope.pathname) !== 0) return false;
  const rel = url.pathname.slice(scope.pathname.length);
  if (rel.indexOf('/') !== -1) return false;
  return rel === '' || SHELL_FILES.indexOf(rel) !== -1;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  /* Google Fonts, giọng đọc TTS, Telegram API, app trong thư mục con: ra mạng, không đệm. */
  if (!isOwnFile(url, new URL(self.registration.scope))) return;

  /* Mạng trước, cache sau — sửa app là thấy ngay bản mới; mất mạng thì dùng bản đã lưu. */
  event.respondWith((async () => {
    try {
      const res = await fetch(req);
      if (res && res.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, res.clone());
      }
      return res;
    } catch (err) {
      const hit = await caches.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === 'navigate') {
        const home = await caches.match('./index.html', { ignoreSearch: true }) || await caches.match('./');
        if (home) return home;
      }
      throw err;
    }
  })());
});
