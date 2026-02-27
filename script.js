function generateQRCode() {
    const inputText = document.getElementById('textInput').value;
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    
    // Clear previous QR code if any
    qrCodeContainer.innerHTML = '';

    // Check if input is empty
    if (inputText.trim() === '') {
        alert('Please enter text or an image URL');
        return;
    }

    // Generate QR Code
    const qrCode = new QRCode(qrCodeContainer, {
        text: inputText,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}
