import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    {/* <React.StrictMode> */}
    <App />
    <Toaster position="top-center" reverseOrder={false} />
    {/* </React.StrictMode> */}
  </QueryClientProvider>
);
