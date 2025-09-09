import { useFullScreen } from "./FullScreenContext";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const FullScreenTawk: React.FC = () => {
  const { isFullScreen } = useFullScreen();

  useEffect(() => {
    const maximizeChat = () => {
      if (window.Tawk_API) {
        if (typeof window.Tawk_API.maximize === "function") {
          window.Tawk_API.maximize();
        }
      } else {
        console.log("Tawk_API is not loaded yet");
      }
    };

    const applyFullScreenStyles = () => {
      // Apply full-screen styles to the body
      document.body.style.position = "fixed";
      document.body.style.top = "0";
      document.body.style.left = "0";
      document.body.style.width = "100vw";
      document.body.style.height = "100vh";
      document.body.style.margin = "0";
      document.body.style.overflow = "hidden";

      // Update the iframe styles
      const tawkIframe = document.querySelector(
        "iframe[title='chat widget']"
      ) as HTMLIFrameElement;

      if (tawkIframe) {
        tawkIframe.style.position = "fixed";
        tawkIframe.style.top = "0";
        tawkIframe.style.left = "0";
        tawkIframe.style.width = "100vw";
        tawkIframe.style.maxWidth = "100vw";
        tawkIframe.style.maxHeight = "100vh";
        tawkIframe.style.height = "100vh";
        tawkIframe.style.border = "none";
        tawkIframe.style.zIndex = "9999";

        // Access iframe content and style the max container
        const iframeDoc =
          tawkIframe.contentDocument || tawkIframe.contentWindow?.document;

        if (iframeDoc) {
          const maxContainer = iframeDoc.querySelector(
            ".tawk-max-container"
          ) as HTMLElement;
          if (maxContainer) {
            maxContainer.style.position = "absolute";
            maxContainer.style.top = "0";
            maxContainer.style.left = "0";
            maxContainer.style.width = "100vw";
            maxContainer.style.maxWidth = "100vw";
            maxContainer.style.maxHeight = "100vh";
            maxContainer.style.height = "100vh";
            maxContainer.style.zIndex = "9999";
            maxContainer.style.borderRadius = "0"; // Remove border-radius for a full-screen effect
          } else {
            console.warn(".tawk-max-container not found in the iframe.");
          }
        }
      } else {
        console.warn("Tawk iframe not found.");
      }
    };

    const resetStyles = () => {
      // Reset body styles
      document.body.style.cssText = "";

      // Reset iframe and max container styles
      const tawkIframe = document.querySelector(
        "iframe[title='chat widget']"
      ) as HTMLIFrameElement;

      if (tawkIframe) {
        tawkIframe.style.position = "";
        tawkIframe.style.top = "";
        tawkIframe.style.left = "";
        tawkIframe.style.width = "";
        tawkIframe.style.height = "";
        tawkIframe.style.border = "";
        tawkIframe.style.zIndex = "";

        const iframeDoc =
          tawkIframe.contentDocument || tawkIframe.contentWindow?.document;

        if (iframeDoc) {
          const maxContainer = iframeDoc.querySelector(
            ".tawk-max-container"
          ) as HTMLElement;
          if (maxContainer) {
            maxContainer.style.position = "";
            maxContainer.style.top = "";
            maxContainer.style.left = "";
            maxContainer.style.width = "";
            maxContainer.style.height = "";
            maxContainer.style.zIndex = "";
            maxContainer.style.borderRadius = "";
          }
        }
      }
    };

    if (isFullScreen) {
      console.log("Entering full-screen chat mode");
      maximizeChat();
      applyFullScreenStyles();
    } else {
      console.log("Exiting full-screen chat mode");
      resetStyles();
    }

    // Cleanup on unmount or dependency change
    return () => {
      resetStyles();
    };
  }, [isFullScreen]);

  return ReactDOM.createPortal(
    <></>, // No visible UI
    document.body // Portal used for attaching styles directly to the body
  );
};

export default FullScreenTawk;
