const TawkWidget = ({ btnTitle }: { btnTitle: string }) => {
  const toggleFullscreen = () => {
    if (window.Tawk_API) {
      console.log(window.Tawk_API, "tawk api");

      window.Tawk_API?.maximize();
      setTimeout(() => {
        const chatIframes = document.querySelectorAll(
          'iframe[title="chat widget"]'
        );

        chatIframes.forEach((iframe) => {
          // Ensure the iframe is an HTMLIFrameElement
          const iframeElement = iframe as HTMLIFrameElement;

          try {
            const iframeDoc =
              iframeElement.contentDocument ||
              iframeElement.contentWindow?.document;
            console.log(iframeDoc, "iframe doc");

            if (iframeDoc) {
              const maxContainer = iframeDoc.querySelector(
                ".tawk-max-container"
              );

              if (maxContainer && maxContainer instanceof HTMLElement) {
                iframeElement.style.position = "fixed";
                iframeElement.style.top = "0";
                iframeElement.style.left = "0";
                iframeElement.style.width = "100vw";
                iframeElement.style.height = "100vh";
                iframeElement.style.maxWidth = "100vw";
                iframeElement.style.maxHeight = "100vh";
                iframeElement.style.zIndex = "9999";
                iframeElement.style.borderRadius = "0";

                maxContainer.style.position = "absolute";
                maxContainer.style.top = "0";
                maxContainer.style.left = "0";
                maxContainer.style.width = "100vw";
                maxContainer.style.height = "100vh";
                maxContainer.style.maxWidth = "100vw";
                maxContainer.style.maxHeight = "100vh";
                maxContainer.style.zIndex = "9999";
                maxContainer.style.borderRadius = "0";
              }
            }
          } catch (error) {
            console.error("Error accessing iframe contents:", error);
          }
        });
      }, 500);
    }
  };
  return (
    <div>
      <button onClick={toggleFullscreen} className="btn">
        {btnTitle}
      </button>
    </div>
  );
};

export default TawkWidget;
