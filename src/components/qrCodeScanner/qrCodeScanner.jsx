import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

import styles from "./qrCodeScanner.module.css";
import "./qrCodeOverwrite.css";
import axios from "axios";
import BlockUI from "../BlockUI/BlockUI";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";



export default function QrCodeScanner({
  setShowWelcomePopup,
  scanResult,
  setScanResult,
  setUser
}) {
  const scannerRef = useRef(null);
  const scannerInstance = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (scannerInstance.current) {
      console.log(scannerInstance.current)

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
    
      setLoading(true)
      axios.post('https://analytiq4.com/demo/qr-scannerv3/php/scan.php', {
        code:decodedResult
      })
      .then(async function (response) {
        var data = response.data;
        if(data.status == "success")
        {
        data.timestamp = Date.now();

        const valueRef = collection(db, "collection1");
        const result = await addDoc(valueRef,data);
        setUser(data)
        setShowWelcomePopup(true)
        }else
        {
          alert("Error. QR already scanned.")
        }
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false)
      });

      let stopButton = document.getElementById('html5-qrcode-button-camera-stop');
      if(stopButton)
         stopButton.click()
      
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
      <BlockUI blocking={loading} />
    </div>
  );
}
