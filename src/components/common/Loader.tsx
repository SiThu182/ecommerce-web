 
import ReactDOM from "react-dom";
import Ripple from "../ui/ripple";
export function Loader({ loading }: { loading: boolean | null }) {
  const modalRoot = document.getElementById("loader-root");
  if (!modalRoot) {
    console.error("Modal root element not found!");
    return null; // or handle error gracefully
  }
  return ReactDOM.createPortal(
    <div
      className={`fixed w-[100vw] h-[100vh] z-[99999] bg-gray-100 ${
        loading ? "block" : "hidden"
      }`}
    >
      <div className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
          Loading ...
        </p>
        <Ripple />
      </div>
    </div>,
    modalRoot
  );
}
