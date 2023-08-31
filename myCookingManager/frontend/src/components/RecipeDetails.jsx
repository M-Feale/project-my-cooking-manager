import { useContext, useEffect } from "react";
import IngredientListInput from "./IngredientListInput";
import { RecipeDetailsContext } from "./RecipeDetailsContext";

const RecipeDetails = () => {
	// I'll need to see how I can access the UserContext from auth0.
	// temporary userId
	const userId = 1234;

	// temporary recipeId (will be replaced by url params)
	const recipeId = "1a2b3c";

	const { currentRecipeDetails, setCurrentRecipeDetails } =
		useContext(RecipeDetailsContext);

	// On mount, fetch recipe associated with the specific recipe's page we are on. 
	// Store the data in the RecipeDetailsContext for the other components to have easy access to it.
	useEffect(() => {

		// If the context is empty or if the context contains a recipe different from the current RecipeDetails' page we are on, fetch the details for the page we're on.
		if (!currentRecipeDetails.recipeId && currentRecipeDetails.recipeId !== recipeId) {
			fetch(`/api/user/${userId}/recipes/${recipeId}`)
				.then((res) => res.json())
				.then((parsedResponse) => {
					if (parsedResponse.status === 200){
						setCurrentRecipeDetails(parsedResponse.data)
					} else {
						throw new Error(parsedResponse)
					}
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});
		}
	}, []);

	return (
		<>
			<IngredientListInput />
		</>
	);
};

export default RecipeDetails;
