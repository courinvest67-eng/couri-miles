// Couri Mile$ — Service Worker v1.0
const CACHE_NAME = 'couri-miles-v1';
const OFFLINE_URL = '/couri-miles/';

// Core assets to cache for offline use
const PRECACHE_ASSETS = [
  '/couri-miles/',
  '/couri-miles/index.html',
  '/couri-miles/manifest.json',
  '/couri-miles/icons/icon-192x192.png',
  '/couri-miles/icons/icon-512x512.png',
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

// Install: precache core assets
self.addEventListener('install', event => {
  console.log('[SW] Installing Couri Mile$ Service Worker v1');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local assets
      const localPromise = cache.addAll(PRECACHE_ASSETS).catch(err => {
        console.log('[SW] Some local assets failed to cache:', err);
      });
      // Cache CDN assets (best effort)
      const cdnPromise = Promise.allSettled(
        CDN_ASSETS.map(url => 
          cache.add(url).catch(err => console.log('[SW] CDN cache skip:', url))
        )
      );
      return Promise.all([localPromise, cdnPromise]);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating Couri Mile$ Service Worker');
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

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Firebase/Firestore API calls (always network)
  if (url.hostname.includes('firestore.googleapis.com') || 
      url.hostname.includes('identitytoolkit.googleapis.com') ||
      url.hostname.includes('securetoken.googleapis.com') ||
      url.hostname.includes('firebase') && url.pathname.includes('/__/')) {
    return;
  }

  // Skip external API calls (promos, exchange rates, etc.)
  if (url.hostname.includes('api.rss2json.com') || 
      url.hostname.includes('allorigins.win') ||
      url.hostname.includes('awesomeapi.com.br') ||
      url.hostname.includes('api.exchangerate')) {
    return;
  }

  // Strategy: Network first for HTML, Cache first for assets
  if (request.destination === 'document' || url.pathname.endsWith('.html')) {
    // Network first for HTML — always try fresh version
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache the fresh version
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          // Offline: serve from cache
          return caches.match(request).then(cached => {
            return cached || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // Cache first for static assets (JS, CSS, fonts, images)
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
        }).catch(() => {
          // Return empty response for non-critical assets
          return new Response('', { status: 408, statusText: 'Offline' });
        });
      })
    );
    return;
  }

  // Default: network first with cache fallback
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

// Handle push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nova promoção de milhas disponível!',
    icon: '/couri-miles/icons/icon-192x192.png',
    badge: '/couri-miles/icons/icon-96x96.png',
    vibrate: [200, 100, 200],
    tag: 'couri-miles-promo',
    renotify: true,
    data: { url: '/couri-miles/' },
    actions: [
      { action: 'open', title: 'Ver agora' },
      { action: 'dismiss', title: 'Depois' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Couri Mile$ ✈️', options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Focus existing window if open
      for (const client of windowClients) {
        if (client.url.includes('/couri-miles/') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      return clients.openWindow(event.notification.data?.url || '/couri-miles/');
    })
  );
});

// Background sync for offline transactions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-transactions') {
    console.log('[SW] Background sync: syncing transactions');
    // The app will handle actual sync via Firebase when online
  }
});

console.log('[SW] Couri Mile$ Service Worker loaded');
