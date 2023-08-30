import { createContext, useState } from "react";

// Create a context to store the RecipeDetails info for the RecipeDetails component and its children.
export const RecipeDetailsContext = createContext(null);

export const RecipeDetailsProvider = ({ children }) => {
	const [currentRecipeDetails, setCurrentRecipeDetails] = useState({
		recipeId: "",
		name: "",
		website: "",
		image: "",
		description: "",
		ratings: [],
		shopping_list: [],
		dates_created: [],
		notes: [],
		make_again: null, // Will be a boolean
		category: "",
		recipe_url: "",
	});

	return (
		<RecipeDetailsContext.Provider
			value={{ currentRecipeDetails, setCurrentRecipeDetails }}
		>
			{children}
		</RecipeDetailsContext.Provider>
	);
};
