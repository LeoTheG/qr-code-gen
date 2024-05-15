import { useState, useRef } from "react";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef(null);

  const generateQRCode = () => {
    if (qrRef.current) {
      console.log("clearing...");
      //@ts-ignore
      qrRef.current.innerHTML = ""; // Clear previous QR code
      //@ts-ignore
      const QRCode = window.QRCode;
      new QRCode(qrRef.current, {
        text: url,
        width: 128,
        height: 128
      });
    }
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      <div ref={qrRef} style={{ marginTop: "20px" }}></div>
    </div>
  );
};

export default QRCodeGenerator;
