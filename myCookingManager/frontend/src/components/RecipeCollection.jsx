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
        setFailedSearch("")
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
