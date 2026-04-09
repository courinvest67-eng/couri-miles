// Couri Mile$ — Service Worker v3.0 — ANTI-CACHE
const CACHE_NAME = 'couri-miles-v3';

// Install: skip waiting immediately
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Activate: DELETE ALL old caches and claim clients
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: NEVER cache HTML, network-first for everything
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;

  // Skip all API calls
  if (url.hostname.includes('firestore') ||
      url.hostname.includes('identitytoolkit') ||
      url.hostname.includes('securetoken') ||
      url.hostname.includes('anthropic') ||
      url.hostname.includes('rss2json') ||
      url.hostname.includes('allorigins') ||
      url.hostname.includes('awesomeapi') ||
      url.hostname.includes('exchangerate')) return;

  // HTML: ALWAYS from network, no cache
  if (event.request.destination === 'document' ||
      url.pathname.endsWith('.html') ||
      url.pathname === '/couri-miles/' ||
      url.pathname === '/couri-miles') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Everything else: network first, cache fallback
  event.respondWith(
    fetch(event.request).then(response => {
      if (response.ok) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});
