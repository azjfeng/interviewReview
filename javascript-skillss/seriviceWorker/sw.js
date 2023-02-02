var VERSION = "v2";

// 缓存
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(VERSION).then(function (cache) {
            return cache.addAll(["./index.html", "./sm.jpeg"]);
        })
    );
});

// 缓存更新
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    // 如果当前版本和缓存版本不一致
                    if (cacheName !== VERSION) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// 捕获请求并返回缓存数据
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request)
            .catch(function () {
                return fetch(event.request);
            })
            .then(function (response) {
                // 将返回结果存在缓存中
                caches.open(VERSION).then(function (cache) {
                    cache.put(event.request, response);
                });
                return response.clone();
            })
            .catch(function () {
                return caches.match("./sm.jpg");
            })
    );
});

self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == '/' && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow('/');
    }));
});