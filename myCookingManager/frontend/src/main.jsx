import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App.jsx";
import Auth0ProviderWithNavigate from "./components/Auth0ProviderWithNavigate.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Router>
			<Auth0ProviderWithNavigate>
				<App />
			</Auth0ProviderWithNavigate>
		</Router>
	</React.StrictMode>
);
