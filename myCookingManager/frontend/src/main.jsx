import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/App.jsx";
import Auth0ProviderWithNavigate from "./components/Auth0ProviderWithNavigate.jsx";
import { RecipeDetailsProvider } from "./components/RecipeDetailsContext.jsx";
import { CatalogueFlowProvider } from "./components/CatalogueFlowContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Router>
			<Auth0ProviderWithNavigate>
				<RecipeDetailsProvider>
					<CatalogueFlowProvider>
						<App />
					</CatalogueFlowProvider>
				</RecipeDetailsProvider>
			</Auth0ProviderWithNavigate>
		</Router>
	</React.StrictMode>
);
