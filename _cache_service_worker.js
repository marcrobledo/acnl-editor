/*
	Cache Service Worker template by mrc 2019
	mostly based in:
	https://github.com/GoogleChrome/samples/blob/gh-pages/service-worker/basic/service-worker.js
	https://github.com/chriscoyier/Simple-Offline-Site/blob/master/js/service-worker.js
	https://gist.github.com/kosamari/7c5d1e8449b2fbc97d372675f16b566e	
	
	Note for GitHub Pages:
	there can be an unexpected behaviour (cache not updating) when site is accessed from
	https://user.github.io/repo/ (without index.html) in some browsers (Firefox)
	use absolute paths if hosted in GitHub Pages in order to avoid it
	also invoke sw with an absolute path:
	navigator.serviceWorker.register('/repo/_cache_service_worker.js', {scope: '/repo/'})
*/

/* MOD: fix old caches for mrc */
caches.keys().then(function (cacheNames) {
  for (var i = 0; i < cacheNames.length; i++) {
    if (
      cacheNames[i] === 'runtime' ||
      /^precache-\w+$/.test(cacheNames[i]) ||
      /^precache-editor-([\w\+]+)-\w+$/.test(cacheNames[i]) ||
      /^v?\d+\w?$/.test(cacheNames[i])
    ) {
      console.log('deleting old cache: ' + cacheNames[i]);
      caches.delete(cacheNames[i]);
    }
  }
});

var PRECACHE_ID = 'acnl-editor';
var PRECACHE_VERSION = 'v1.6.3';
var PRECACHE_URLS = [
  '/acnl-editor/',
  '/acnl-editor/index.html',
  '/acnl-editor/help.html',
  '/acnl-editor/resources/acnl_editor.css',
  '/acnl-editor/resources/acres.png',
  '/acnl-editor/resources/favicon.png',
  '/acnl-editor/resources/logo.png',
  '/acnl-editor/resources/no_tpc.png',
  '/acnl-editor/resources/NotoSans.woff2',
  '/acnl-editor/resources/NotoSansBold.woff2',
  '/acnl-editor/resources/NotoSansItalic.woff2',
  '/acnl-editor/resources/sprites.png',
  '/acnl-editor/resources/villagers.jpg',
  '/acnl-editor/js/buildings.js',
  '/acnl-editor/js/checksum.js',
  '/acnl-editor/js/data_types.js',
  '/acnl-editor/js/editor_garden.js',
  '/acnl-editor/js/items.js',
  '/acnl-editor/js/items_de.js',
  '/acnl-editor/js/items_enu.js',
  '/acnl-editor/js/items_es.js',
  '/acnl-editor/js/items_fr.js',
  '/acnl-editor/js/items_it.js',
  '/acnl-editor/js/items_jp.js',
  '/acnl-editor/js/items_kr.js',
  '/acnl-editor/js/libraries.js',
  '/acnl-editor/js/patterns.js',
  '/acnl-editor/js/villagers.js',
];

// install event (fired when sw is first installed): opens a new cache
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches
      .open('precache-' + PRECACHE_ID + '-' + PRECACHE_VERSION)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// activate event (fired when sw is has been successfully installed): cleans up old outdated caches
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) =>
            cacheName.startsWith('precache-' + PRECACHE_ID + '-') &&
            !cacheName.endsWith('-' + PRECACHE_VERSION)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            console.log('delete ' + cacheToDelete);
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// fetch event (fired when requesting a resource): returns cached resource when possible
self.addEventListener('fetch', (evt) => {
  if (evt.request.url.startsWith(self.location.origin)) {
    //skip cross-origin requests
    evt.respondWith(
      caches.match(evt.request).then((cachedResource) => {
        if (cachedResource) {
          return cachedResource;
        } else {
          return fetch(evt.request);
        }
      })
    );
  }
});
