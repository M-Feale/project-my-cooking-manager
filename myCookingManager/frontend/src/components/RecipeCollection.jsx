import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import SearchBar from "./SearchBar";
import CategoryMenu from "./CategoryMenu";
import RecipeGrid from "./RecipeGrid";

const RecipeCollection = () => {
	// Import user object from auth0
	const { user } = useAuth0();

	// States used to control children components of RecipeCollection and allow for all the fetch logic to be in one place.
	const [recipes, setRecipes] = useState("");
	const [searchTerms, setSearchTerms] = useState("");
	const [category, setCategory] = useState("");
	const [failedSearch, setFailedSearch] = useState("");

	// Fetch logic to do one GET matching the value of the searchTerms and category states, if any value is set.
	useEffect(() => {
		setFailedSearch("");
		// Logic to set the fetch endpoint url to the appropriate value
		let endpoint;
		if (searchTerms) {
			endpoint = `/api/user/${user.sub}/recipes/search/${searchTerms}`;
		} else if (category) {
			endpoint = `/api/user/${user.sub}/categories/${category}`;
		} else {
			endpoint = `/api/user/${user.sub}/recipes`;
		}

		fetch(endpoint)
			.then((res) => {
				if (res.status !== 204) {
					return res.json();
				} else {
					return res;
				}
			})
			.then((parsedRes) => {
				if (parsedRes.status === 200) {
					setRecipes(parsedRes.data);
				} else if (parsedRes.status === 204) {
					setFailedSearch(
						`${searchTerms} didn't point to any recipes in your Recipe Collection`
					);
				}
			})
			.catch((error) => {
				console.error("Fetch error:", error.message);
			});
	}, [searchTerms, category]);

	return (
		<>
			<SearchBar
				setSearchTerms={setSearchTerms}
				failedSearch={failedSearch}
			/>
			<CategoryMenu setCategory={setCategory} />
			<RecipeGrid recipes={recipes} />
		</>
	);
};

export default RecipeCollection;
