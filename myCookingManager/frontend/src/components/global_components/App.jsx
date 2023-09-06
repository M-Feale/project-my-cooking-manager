import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Home from "../HomePage/Home";
import RecipeCollection from "../RecipeCollectionPage/RecipeCollection";
import RecipeDetails from "../RecipeDetails";
import Callback from "./Callback";
import CataloguingPage from "../CataloguingPage";
import ErrorPage from "./ErrorPage";

const App = () => {
	// For conditional rendering of a PageLoader when isLoading is true
	const { isLoading } = useAuth0();

	return (
		<>
			<GlobalStyles />

			<Header />
			{isLoading ? (
				<Callback />
			) : (
				<>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/catalogue"
							element={<CataloguingPage />}
						/>
						<Route path="/recipes" element={<RecipeCollection />} />
						<Route
							path="/recipes/:recipeId"
							element={<RecipeDetails />}
						/>
						<Route path="/callback" element={<Callback />} />
						<Route
							path="*"
							element={<ErrorPage />}
						/>
					</Routes>
				</>
			)}
		</>
	);
};

export default App;