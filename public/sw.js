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

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(STATIC_CACHE);
    self.skipWaiting();
  })());
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(name => {
        if (name !== CACHE_NAME) {
          return caches.delete(name);
        }
      })
    );
    self.clients.claim();
  })());
});

// Fetch: handle API & static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  // API caching strategy (stale-while-revalidate)
  if (API_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);

      if (cached) {
        // Update in background
        fetch(request).then(async response => {
          if (response.ok) {
            await cache.put(request, response.clone());
          }
        }).catch(() => {});
        return cached;
      }

      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        return cached || new Response('Offline', { status: 503 });
      }
    })());
    return;
  }

  // Static assets caching (cache-first)
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;

      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.put(request, response.clone());
        }
        return response;
      } catch {
        return new Response('Offline', { status: 503 });
      }
    })());
  }
});
