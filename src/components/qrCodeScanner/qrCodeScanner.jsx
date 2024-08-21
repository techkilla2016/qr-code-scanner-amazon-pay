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
  const scannerInstance = useRef(null);

  useEffect(() => {
    if (scannerInstance.current) {
      return;
    }

    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scannerInstance.current = scanner;

    // success function
    const onScanSuccess = (decodedResult) => {
      setScanResult(decodedResult);
      setShowWelcomePopup(true);

      // restart the scanner after clear
      setTimeout(() => {
        scanner
          .clear()
          .then(() => {
            scanner.render(onScanSuccess, onScanFailure); // Restart scanner
          })
          .catch((error) => {
            console.error("Failed to clear html5QrcodeScanner:", error);
          });
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
      if (scannerInstance.current) {
        scannerInstance.current.clear().catch((error) => {
          console.error("Failed to clear html5QrcodeScanner:", error);
        });
        scannerInstance.current = null;
      }
    };
  }, [setScanResult, setShowWelcomePopup]);

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
