let audio = new Audio();

// オンラインかオフラインかをチェック
if (navigator.onLine) {
    // オンライン時：ネットワークから音声を再生
    audio.src = "https://example.com/audio/sample.mp3"; // サーバー上の音声URL
} else {
    // オフライン時：キャッシュされた音声を再生
    audio.src = "/audio/sample.mp3";  // PWA内に保存されている音声ファイル
}

audio.play().catch((error) => {
    console.error("音声の再生に失敗しました", error);
});
