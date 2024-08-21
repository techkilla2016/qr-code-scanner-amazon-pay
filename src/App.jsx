import React, { useState } from "react";

import QrCodeScanner from "./components/qrCodeScanner/qrCodeScanner";
import WelcomePopup from "./components/welcomePopup/WelcomePopup";

export default function App() {
  const [user,setUser] = useState({Name:""})
  const [showWelcomePopup, setShowWelcomePopup] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  return (
    <div>
      <QrCodeScanner
        setShowWelcomePopup={setShowWelcomePopup}
        scanResult={scanResult}
        setUser={setUser}
        setScanResult={setScanResult}
      />

      {showWelcomePopup && (
        <WelcomePopup
          user = {user}
          setShowWelcomePopup={setShowWelcomePopup}
          setScanResult={setScanResult}
        />
      )}
    </div>
  );
}
