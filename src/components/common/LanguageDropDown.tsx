/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

const LanguageDropdown: React.FC = () => {
  const [googleTranslateReady, setGoogleTranslateReady] = useState(false);

  useEffect(() => {
    // Load the Google Translate script only once
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onload = () => {
      console.log("Google Translate script loaded");
    };

    document.body.appendChild(script);

    // Ensure that Google Translate is initialized after the script loads
    (window as any).googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en", // Default language
            includedLanguages: "en,zh-CN,th,my", // Languages to include
            layout: (window as any).google.translate.TranslateElement
              .InlineLayout.SIMPLE,
            autoDisplay: false, // Do not display the widget’s dropdown by default
          },
          "google_translate_element"
        );
        setGoogleTranslateReady(true); // Set state to true when initialization is complete
      } else {
        console.error("Google Translate is not loaded properly.");
      }
    };

    return () => {
      // Clean up the script element after component unmount
      document.body.removeChild(script);
    };
  }, []);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;

    if (!googleTranslateReady) {
      console.log("Google Translate is not initialized yet.");
      return;
    }

    // Make sure the Google Translate widget is loaded and ready
    const translateElement = document.getElementById(
      "google_translate_element"
    );

    if (translateElement) {
      const translateInstance = (window as any).google.translate
        .TranslateElement;

      if (translateInstance) {
        const translateFrame = document.querySelector(
          "iframe.goog-te-menu-frame"
        );

        if (translateFrame instanceof HTMLIFrameElement) {
          const iframeDoc = translateFrame.contentWindow?.document;

          if (iframeDoc) {
            // Wait for the iframe content to be available and ensure language change logic runs
            const languageOptions = iframeDoc.querySelectorAll(
              ".goog-te-menu2-item span.text"
            );

            // Loop through options and select the corresponding one
            languageOptions.forEach((option: any) => {
              if (
                option.textContent
                  .toLowerCase()
                  .includes(selectedLanguage.toLowerCase())
              ) {
                option.click(); // Simulate click on the desired language
              }
            });
          }
        }
      }
    }
  };

  return (
    <div>
      {/* Custom Language Dropdown */}
      <select
        onChange={handleLanguageChange}
        style={{ padding: "8px", fontSize: "16px" }}
      >
        <option value="en">English</option>
        <option value="zh-CN">Chinese</option>
        <option value="th">Thai</option>
        <option value="my">Myanmar</option>
      </select>

      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </div>
  );
};

export default LanguageDropdown;
