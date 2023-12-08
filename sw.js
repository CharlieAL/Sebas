const CACHE_NAME = 'v1_cache_soy_sebas_y_gay'

var urlsToCache = [
  './',
  './css/estilos.css',
  './img/favicon.png',
  './images/about.jpg',
  './icon-192x192.png',
  './icon-512x512.png',
  './icon-256x256.png',
  './icon-384x384.png'
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => {
          console.log('first cache')
          self.skipWaiting()
        })
      })
      .catch((err) => {
        console.log('no se ha registrado el chache', err)
      })
  )
})

self.addEventListener('activate', (e) => {
  const cacheWhiteList = [CACHE_NAME]

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        console.log(cacheNames)
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        self.clients.claim()
      })
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      console.log('res')
      if (res) {
        return res
      }
      return fetch(e.request)
    })
  )
})
