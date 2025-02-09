// Service Workerで音声ファイルをキャッシュ
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("audio-cache").then((cache) => {
            return cache.addAll([
                "index.html",
                "script.js",
                "/ja/music/q2iR" // 音声ファイルをキャッシュ
            ]);
        })
    );
});

// キャッシュとネットワークの切り替え処理
self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("sample.mp3")) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((fetchResponse) => {
                    return caches.open("audio-cache").then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    }
});
