// IndexedDB に音声ファイルを保存
function saveAudioFile(file) {
    let request = indexedDB.open("AudioDB", 1);

    request.onupgradeneeded = function(event) {
        let db = event.target.result;
        db.createObjectStore("audios", { keyPath: "name" });
    };

    request.onsuccess = function(event) {
        let db = event.target.result;
        let transaction = db.transaction("audios", "readwrite");
        let store = transaction.objectStore("audios");

        let reader = new FileReader();
        reader.onload = function() {
            store.put({ name: file.name, data: reader.result });
            alert("音声が保存されました！");
        };
        reader.readAsDataURL(file);
    };
}

// QRコードから取得した音声を再生
function playAudioFromDB(audioName) {
    let request = indexedDB.open("AudioDB", 1);

    request.onsuccess = function(event) {
        let db = event.target.result;
        let transaction = db.transaction("audios", "readonly");
        let store = transaction.objectStore("audios");

        let getRequest = store.get(audioName);
        getRequest.onsuccess = function() {
            if (getRequest.result) {
                let audio = document.getElementById("audioPlayer");
                audio.src = getRequest.result.data;
                audio.play();
            } else {
                alert("音声が見つかりません！");
            }
        };
    };
}

// ファイル選択ボタンのイベント
document.getElementById("audioFile").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        saveAudioFile(file);
    }
});

//音声読み取り
document.addEventListener("DOMContentLoaded", function () {
    function onScanSuccess(decodedText) {
        document.getElementById("qr-result").innerText = "QRコード読み取り成功: " + decodedText;
        playAudioFromDB(decodedText);  // QRコードのデータをファイル名として再生
    }

    new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 })
        .render(onScanSuccess);
});
