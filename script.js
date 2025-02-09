document.addEventListener("DOMContentLoaded", function () {
    function onScanSuccess(decodedText) {
        document.getElementById("qr-result").innerText = "読み取ったパス: " + decodedText;
        
        let audioPlayer = document.getElementById("audioPlayer");
        audioPlayer.src = decodedText; // ローカルの音声ファイルを指定
        audioPlayer.play();
    }

    new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 })
        .render(onScanSuccess);
});
