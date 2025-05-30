import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./components/Cart/CartContext"; // Ensure correct path

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CartProvider>
			<App />
		</CartProvider>
	</React.StrictMode>
);
