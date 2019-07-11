const dataCacheName = 'swDemoData-v1';
const cacheName = 'sw-demo-1';
const filesToCache = [
  'index.html',
  'styles.css',
  'assets/big_image_10mb.jpg',
  'assets/big_image_2mb.jpg'
];


self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
      caches.open(cacheName)
          .then(cache => cache.addAll(filesToCache))
  );
});


self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');

  e.waitUntil(
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

self.addEventListener('fetch', e => {
  console.log('[Service Worker] Fetch', e.request.url);
  const dataUrl = 'assets/big_image_10mb.jpg';


  console.log('>>> request: ', e.request);


  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
        caches.open(dataCacheName).then(function (cache) {
          return fetch(e.request).then(function (response) {
            cache.put(e.request.url, response.clone());
            return response;
          });
        })
    );
  } else {
    e.respondWith(
        caches.match(e.request).then(function (response) {
          return response || fetch(e.request);
        })
    );
  }
});
