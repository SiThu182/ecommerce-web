import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GuestCartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <GuestCartProvider>
         <WishlistProvider>

        <Router>
          <App />
        </Router>
         </WishlistProvider>

      </GuestCartProvider>
    </QueryClientProvider>
  </Provider>
</StrictMode>
);
