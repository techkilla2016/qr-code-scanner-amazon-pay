import React, { useState } from "react";

import QrCodeScanner from "./components/qrCodeScanner/qrCodeScanner";
import WelcomePopup from "./components/welcomePopup/WelcomePopup";

export default function App() {
  const [showWelcomePopup, setShowWelcomePopup] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  return (
    <div>
      <QrCodeScanner
        setShowWelcomePopup={setShowWelcomePopup}
        scanResult={scanResult}
        setScanResult={setScanResult}
      />

      {showWelcomePopup && (
        <WelcomePopup
          setShowWelcomePopup={setShowWelcomePopup}
          setScanResult={setScanResult}
        />
      )}
    </div>
  );
}
