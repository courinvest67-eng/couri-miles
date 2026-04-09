// Couri Mile$ — Service Worker v2.1
const CACHE_NAME = 'couri-miles-v2.1';
const OFFLINE_URL = '/couri-miles/';

// Core assets to cache (NOT index.html - always fetched fresh)
const PRECACHE_ASSETS = [
  '/couri-miles/manifest.json',
  '/couri-miles/icon-192x192.png',
  '/couri-miles/icon-512x512.png',
];

// External CDN assets to cache
const CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap',
];

// Install: precache assets and skip waiting immediately
self.addEventListener('install', event => {
  console.log('[SW] Installing Couri Mile$ SW v2.1');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      const localPromise = cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.log('[SW] Local cache partial fail:', err);
      });
      const cdnPromise = Promise.allSettled(
        CDN_ASSETS.map(url =>
          cache.add(url).catch(err => console.log('[SW] CDN skip:', url))
        )
      );
      return Promise.all([localPromise, cdnPromise]);
    }).then(() => self.skipWaiting())
  );
});

// Activate: delete ALL old caches and claim clients immediately
self.addEventListener('activate', event => {
  console.log('[SW] Activating Couri Mile$ SW v2.1');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log('[SW] Deleting old cache:', key);
          return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET
  if (request.method !== 'GET') return;

  // Skip Firebase/API calls — always network
  if (url.hostname.includes('firestore.googleapis.com') ||
      url.hostname.includes('identitytoolkit.googleapis.com') ||
      url.hostname.includes('securetoken.googleapis.com') ||
      (url.hostname.includes('firebase') && url.pathname.includes('/__/'))) {
    return;
  }

  // Skip external APIs
  if (url.hostname.includes('api.rss2json.com') ||
      url.hostname.includes('allorigins.win') ||
      url.hostname.includes('awesomeapi.com.br') ||
      url.hostname.includes('api.exchangerate') ||
      url.hostname.includes('api.anthropic.com')) {
    return;
  }

  // HTML / index.html → ALWAYS network first, NO cache on success
  // This ensures fresh code is always loaded
  if (request.destination === 'document' ||
      url.pathname.endsWith('.html') ||
      url.pathname === '/couri-miles/' ||
      url.pathname === '/couri-miles') {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then(response => {
          // Store a copy for offline fallback only
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          // Offline fallback
          return caches.match(request).then(cached => {
            return cached || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // Static assets (JS libs, CSS, fonts, images) → cache first
  if (request.destination === 'script' ||
      request.destination === 'style' ||
      request.destination === 'font' ||
      request.destination === 'image' ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.woff2')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        }).catch(() => new Response('', { status: 408 }));
      })
    );
    return;
  }

  // Default: network first
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nova promoção de milhas disponível!',
    icon: '/couri-miles/icon-192x192.png',
    badge: '/couri-miles/icon-96x96.png',
    vibrate: [200, 100, 200],
    tag: 'couri-miles-promo',
    renotify: true,
    data: { url: '/couri-miles/' },
    actions: [
      { action: 'open', title: 'Ver agora' },
      { action: 'dismiss', title: 'Depois' }
    ]
  };
  event.waitUntil(self.registration.showNotification('Couri Mile$ ✈️', options));
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url.includes('/couri-miles/') && 'focus' in client) return client.focus();
      }
      return clients.openWindow(event.notification.data?.url || '/couri-miles/');
    })
  );
});

// Background sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-transactions') {
    console.log('[SW] Background sync: transactions');
  }
});

console.log('[SW] Couri Mile$ SW v2.1 loaded');
