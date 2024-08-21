import React from "react";
import styles from "./welcomePopup.module.css";

import welcomeLogo from "./../../assets/welcome-logo.png";
import leftDiya from "./../../assets/leftDiya.png";
import close from "./../../assets/close.png";

export default function WelcomePopup({ user,setShowWelcomePopup, setScanResult }) {
  console.log("started welcome popup");

  return (
    <div className={`flex-row-center ${styles.WelcomePopup}`}>
      <div className={`flex-row-center ${styles.mainContainer}`}>
        <div className={styles.headingLogo}>
          <img src={welcomeLogo} alt="welcome-logo" />
        </div>

        <div className={`flex-col-center ${styles.welcomeTitle}`}>
          <h1 className={styles.upperTxt}>Welcome</h1>
          <h2 className={styles.resultTxt}>{user.Name}</h2>
        </div>

        {/* left diya */}
        <div className={`${styles.diyas} ${styles.diyaLeft}`}>
          <img src={leftDiya} alt="leftDiya" />
        </div>

        {/* right diya */}
        <div className={`${styles.diyas} ${styles.diyaRight}`}>
          <img src={leftDiya} alt="Right Diya" />
        </div>

        {/* close */}
        <div
          onClick={() => {
            setShowWelcomePopup(false);
            setScanResult("");
          }}
          className={styles.closeButton}
        >
          <img src={close} alt="Close" />
        </div>
      </div>
    </div>
  );
}
