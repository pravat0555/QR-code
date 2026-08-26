const textInput = document.getElementById("textInput");
const qrCodeContainer = document.getElementById("qrCodeContainer");

const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

const charCount = document.getElementById("charCount");
const status = document.getElementById("status");

let currentText = "";


// =====================================
// CHARACTER COUNTER
// =====================================

textInput.addEventListener("input", () => {

    charCount.textContent =
        textInput.value.length;

});


// =====================================
// GENERATE QR CODE
// =====================================

function generateQRCode() {

    const text =
        textInput.value.trim();


    // Validation
    if (text === "") {

        textInput.focus();

        textInput.style.borderColor =
            "#ef4444";

        setTimeout(() => {

            textInput.style.borderColor =
                "#263044";

        }, 1500);

        return;
    }


    currentText = text;


    // Clear old QR
    qrCodeContainer.innerHTML = "";


    // Generate QR
    new QRCode(
        qrCodeContainer,
        {
            text: text,

            width: 210,

            height: 210,

            colorDark: "#111827",

            colorLight: "#ffffff",

            correctLevel:
                QRCode.CorrectLevel.H
        }
    );


    // Enable buttons
    downloadBtn.disabled = false;
    copyBtn.disabled = false;
    clearBtn.disabled = false;


    // Update status
    status.className =
        "status success";

    status.innerHTML =
        "<span></span> Generated";
}


// =====================================
// DOWNLOAD QR
// =====================================

function downloadQRCode() {

    const canvas =
        qrCodeContainer.querySelector(
            "canvas"
        );

    const image =
        qrCodeContainer.querySelector(
            "img"
        );


    if (!canvas && !image) {

        return;
    }


    let url;


    if (canvas) {

        url =
            canvas.toDataURL(
                "image/png"
            );

    } else {

        url = image.src;

    }


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "QR-Code.png";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    // Button feedback
    const original =
        downloadBtn.innerHTML;


    downloadBtn.innerHTML =
        "✓ Downloaded";


    setTimeout(() => {

        downloadBtn.innerHTML =
            original;

    }, 1500);
}


// =====================================
// COPY TEXT
// =====================================

async function copyText() {

    if (!currentText) {

        return;
    }


    try {

        await navigator.clipboard
            .writeText(currentText);


        const original =
            copyBtn.innerHTML;


        copyBtn.innerHTML =
            "✓ Copied";


        setTimeout(() => {

            copyBtn.innerHTML =
                original;

        }, 1500);


    } catch (error) {

        alert(
            "Unable to copy the content."
        );

    }
}


// =====================================
// CLEAR QR
// =====================================

function clearQRCode() {

    textInput.value = "";

    charCount.textContent = "0";

    currentText = "";


    qrCodeContainer.innerHTML = `

        <div class="empty-state">

            <div class="qr-placeholder">

                <div class="qr-symbol">
                    ▦
                </div>

            </div>

            <h4>
                Your QR code will appear here
            </h4>

            <p>
                Enter content and generate
                your QR code
            </p>

        </div>

    `;


    downloadBtn.disabled = true;

    copyBtn.disabled = true;

    clearBtn.disabled = true;


    status.className =
        "status ready";

    status.innerHTML =
        "<span></span> Ready";
}


// =====================================
// REFRESH BUTTON
// =====================================

function refreshPage() {

    const refreshIcon =
        document.querySelector(
            ".refresh-icon"
        );


    refreshIcon.style.transform =
        "rotate(360deg)";


    setTimeout(() => {

        location.reload();

    }, 350);
}


// =====================================
// KEYBOARD SHORTCUT
// =====================================

textInput.addEventListener(
    "keydown",
    (event) => {

        // Ctrl + Enter
        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            generateQRCode();

        }

    }
);