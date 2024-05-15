import { useState, useRef, useEffect } from "react";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://leotheg.github.io/qr-code-gen/qrcode.min.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  const generateQRCode = () => {
    if (qrRef.current) {
      //@ts-ignore
      qrRef.current.innerHTML = ""; // Clear previous QR code
      //@ts-ignore
      const QRCode = window.QRCode;
      new QRCode(qrRef.current, {
        text: url,
        width: 128,
        height: 128
      });

      setHasGenerated(true);
    }
  };

  return (
    <div
      style={{
        fontFamily: "poppins",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "fit-content"
      }}
    >
      <div style={{ fontSize: "xx-large" }}>QR Code Generator</div>
      <div
        style={{
          display: "flex"
        }}
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          style={{
            padding: "5px"
          }}
        />
        <button onClick={generateQRCode}>Generate QR Code</button>
      </div>
      <div ref={qrRef} style={{ marginTop: "20px" }}></div>
      {/* {qrRef.current && ( */}
      {hasGenerated && (
        <a
          onClick={() => {
            //@ts-ignore
            const img = qrRef.current.querySelector("img");
            if (img) {
              const link = document.createElement("a");
              link.href = img.src;
              link.download = "qr-code.png";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }}
          download="qr-code.png"
          style={{
            marginTop: "10px",
            textDecoration: "none",
            cursor: "pointer"
          }}
        >
          Download QR Code
        </a>
      )}
    </div>
  );
};

export default QRCodeGenerator;
