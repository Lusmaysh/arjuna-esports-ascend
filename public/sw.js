// Service Worker for caching static assets
const CACHE_NAME = 'arjuna-esports-v1';
const STATIC_CACHE = [
  '/',
  '/src/index.css',
  '/src/main.tsx',
  '/placeholder.svg',
];

// API routes to cache
const API_CACHE_PATTERNS = [
  /.*\.supabase\.co\/rest\/v1\/tournaments.*/,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache static assets
  if (request.method === 'GET') {
    // API caching strategy
    if (API_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
      event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
          return cache.match(request).then(cached => {
            if (cached) {
              // Serve from cache and update in background
              fetch(request).then(response => {
                if (response.status === 200) {
                  cache.put(request, response.clone());
                }
              }).catch(() => {});
              return cached;
            }
            
            // Fetch and cache
            return fetch(request).then(response => {
              if (response.status === 200) {
                cache.put(request, response.clone());
              }
              return response;
            });
          });
        })
      );
      return;
    }

    // Static assets caching
    if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
      event.respondWith(
        caches.match(request).then(cached => {
          return cached || fetch(request).then(response => {
            const cache = caches.open(CACHE_NAME);
            cache.then(c => c.put(request, response.clone()));
            return response;
          });
        })
      );
    }
  }
});