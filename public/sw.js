self.addEventListener('install', () => {
  console.log('Looking for something? 👀')
})

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response
        }

        return caches.open('cache').then((cache) => {
          return fetch(event.request).then((response) => {
            return cache.put(event.request, response.clone()).then(() => {
              return response
            })
          })
        })
      }),
    )
  }
})
