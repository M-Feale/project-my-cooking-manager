import { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import CategoryMenu from "./CategoryMenu";
import RecipeGrid from "./RecipeGrid";

const RecipeCollection = () => {
	// temporary userId
	const userId = 1234;

	const [recipes, setRecipes] = useState("");
	const [searchTerms, setSearchTerms] = useState("");
	const [category, setCategory] = useState("");
	const [failedSearch, setFailedSearch] = useState("");

	// Fetch logic to do one GET matching the value of the searchTerms and category states, if any value is set.
	useEffect(() => {
		// Logic to set the fetch endpoint url to the appropriate value
		let endpoint;
		if (searchTerms) {
			endpoint = `http://localhost:4999/user/${userId}/recipes/search/${searchTerms}`;
		} else if (category) {
			endpoint = `http://localhost:4999/user/${userId}/categories/${category}`;
		} else {
			endpoint = `http://localhost:4999/user/${userId}/recipes`;
		}

		fetch(endpoint)
			.then((res) => res.json())
			.then((parsedRes) => {
				console.log(parsedRes);

				// if (parsedRes.status === 200) {
				// 	setRecipes(parsedRes.data);
				// } else {
				// 	// The logic here would be to show the failed fetch message (like for an unsuccessful searchTerm search) somewhere so the user would know to try the search again but with different words. I think that I'll create a "failedFetch" state to make that message appear under the search bar. Logically, that would be the only failed fetch that could occur because the categories are going to be created from the already present categories in the database so they'll never be able to click on a category that doesn't point to any recipe in the DB.
				// 	console.log(parsedRes.message);
				// 	setFailedSearch(parsedRes.message);
				// }
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
