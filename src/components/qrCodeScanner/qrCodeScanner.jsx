import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import styles from "./qrCodeScanner.module.css";
import "./qrCodeOverwrite.css";

export default function QrCodeScanner({
  setShowWelcomePopup,
  scanResult,
  setScanResult,
}) {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    // success function
    const onScanSuccess = (decodedResult) => {
      setScanResult(decodedResult);
      setShowWelcomePopup(true);
      setTimeout(() => {
        scanner.clear();
        scanner.render(onScanSuccess, onScanFailure); // Restart scanner
      }, 500);
    };

    // error function
    const onScanFailure = (error) => {
      if (error) {
        // Handle scan failure (e.g., log warnings or errors if needed)
      }
    };

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner:", error);
      });
    };
  }, [scanResult]);

  return (
    <div className={`flex-col-center ${styles.QrCodeScanner}`}>
      <h1>QR Code Scanner</h1>
      {/* scanner */}
      <div className={`flex-col-center ${styles.qrWrapper}`}>
        <div
          id="qr-reader"
          ref={scannerRef}
          className={`flex-col-center ${styles.qrBox}`}
        ></div>
      </div>

      {/* scan result */}
      <div className={`flex-col-center ${styles.scanResult}`}>
        <h2>Scan Result:</h2>
        <p className={scanResult ? styles.showResult : styles.hideResult}>
          Result:{" "}
          <a href={scanResult} target="_blank" rel="noopener noreferrer">
            {scanResult}
          </a>
        </p>
      </div>
    </div>
  );
}
