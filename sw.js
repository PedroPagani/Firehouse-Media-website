'use strict'

const staticCacheName = 'app-cache-v1';


self.addEventListener('install', (e) => {

    e.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll([
                '/',
                'index.html',
                'js/main.js',
                'js/portfolioController.js',
                'css/main.css',
                'css/animation.css',
                'img/MENOR-logo-firehouse-media-motion-graphics-loading-site-Trasparent-Black.gif',
                'img/MENOR-Logo-fogo-firehouse-site-parte-animada-motion-graphics-TRANS-WHITE-menor.gif',
                
                'img/Logo-firehouse-media-site-parte-estatica-WHITE-menor.png',
                'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css',
                'https://fonts.googleapis.com/css?family=Raleway:400,500,700,800,900',
                'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
                'https://fonts.googleapis.com/css?family=Open+Sans:400,700,800'

            ]);
        })
    )
})


self.addEventListener('activate', (event) => {

    event.waitUntil(
        //caches.keys() pega todos os caches
        caches.keys().then(cacheNames => {

            // Promise.all pega todas as promises, espera resolver tudo, e retorna uma promise apenas
            return Promise.all(

                cacheNames.filter(cacheName => {

                    return cacheName.startsWith('app-') && cacheName != staticCacheName;

                }).map((cacheName) => {

                    return caches.delete(cacheName);
                })
            );
            
        })
    )
})


self.addEventListener('fetch', (e) => {

    e.respondWith(
        // caches.match verifica o nome dos caches
        // acho que ele busca no e.request o nome do cache
        caches.match(e.request).then((response) => {
            if(response) {
                return response;
            }
            return fetch(e.request);
        })
    )
})




