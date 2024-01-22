const wrapper = document.querySelector(".container"),
  qrInput = wrapper.querySelector(".form input"),
  generateBtn = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img"),
  downloadBtn = wrapper.querySelector(".download");

let preValue;

generateBtn.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  generateBtn.innerText = "Generating QR Code...";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateBtn.innerText = "Generate QR Code";

    // Enable the download button when QR code is generated
    downloadBtn.disabled = false;
  });
});

// Add click event listener to the download button
downloadBtn.addEventListener("click", () => {
  // Trigger the downloadQRCode function when the download button is clicked
  downloadQRCode();
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
    // Disable the download button when there is no QR code
    downloadBtn.disabled = true;
  }
});

function downloadQRCode() {
  // Create an anchor element
  const link = document.createElement("a");

  // Set the href attribute to the QR code image source
  link.href = qrImg.src;

  // Set the download attribute to specify the file name
  link.download = "qr-code.png";

  // Append the anchor element to the document body
  document.body.appendChild(link);

  // Trigger a click on the anchor element to start the download
  link.click();

  // Remove the anchor element from the document body
  document.body.removeChild(link);
}

