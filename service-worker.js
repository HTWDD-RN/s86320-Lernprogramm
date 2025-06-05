// Cache name
const CACHE_NAME = 'lernprogramm';

// List of assets to be cached
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style/style.css',
  './script/util.js',
  './script/render.js',
  './script/quiz.js',
  './script/index.js',
  './script/qwerty-hancock.min.js',
  './manifest.json',
  './data/quizdata.json',
  './media/card.svg',
  './media/dashboard.svg',
  './media/extern.svg',
  './media/info.svg',
  './media/mathe.svg',
  './media/moon.svg',
  './media/musik.svg',
  './media/profile.svg',
  './media/sun.svg',
  './media/webtechnik.svg',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  './favicon-16x16.png',
  './favicon-32x32.png',
  './favicon.ico',
  'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js',
  'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css',
  'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js',
];

// Service Worker 'install' event - runs when the service worker is first installed
self.addEventListener('install', event => {
  // Wait until the cache is opened and adds all specified assets to it
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE)) // Cache all listed assets
      .then(() => self.skipWaiting()) // Activate worker immediately without waiting for old one to finish
  );
});

// Service Worker 'activate' event - runs after install, used to clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      // Remove all caches that don't match the current CACHE_NAME
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim()) // Take control of all clients immediately
  );
});

// Service Worker 'fetch' event - intercepts all network requests
self.addEventListener('fetch', event => {
  event.respondWith(
    // Try to serve from cache first, otherwise fall back to network
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
