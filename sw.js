const dataCacheName = 'swDemoData-v1';
const cacheName = 'sw-demo-1';
const filesToCache = [
  'index.html',
  'styles.css',
  'assets/big_image_10mb.jpg',
  'assets/big_image_2mb.jpg'
];

self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
      caches.open(cacheName)
          .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');

  event.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(keyList.map(function (key) {
          if (key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetch', event.request.url);
  const dataUrl = 'http://127.0.0.1:8080/assets/big_image_10mb.jpg';

  if (event.request.url.indexOf(dataUrl) > -1) {
    event.respondWith(
        caches.open(dataCacheName).then(function (cache) {
          return fetch(event.request).then(function (response) {
            cache.put(event.request.url, response.clone());
            return response;
          });
        })
    );
  } else {
    event.respondWith(
        caches.match(event.request).then(function (response) {
          return response || fetch(event.request);
        })
    );
  }
});

function loadImage() {
  return fetch('http://localhost:8080/assets/big_image_10mb.jpg');
}

// Message from the client
self.addEventListener('message', event => {
  if (event.data === 'FETCH_IMAGE') {

    for (let i = 0; i <  100000; i++) {
      console.log('Blocking the service worker thread.');
    }

    loadImage().then(response => {
      clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage(response.url);
        })
      })
    });
  }
});