const CACHE_NAME = 'v-1';
const urlsToCache = ['index.html', 'offline.html'];

// Install SW
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching files...')
                return cache.addAll(urlsToCache)
            })
            .then(() => self.skipWaiting())
            .catch(err => console.log('Service Worker Error while caching files: ', err))
    );
})

// Fetch requests
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
        .then(() => fetch(e.request))
        .catch(() => caches.match('offline.html'))
    );
})

// Activate SW
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheName !== CACHE_NAME){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    );
})