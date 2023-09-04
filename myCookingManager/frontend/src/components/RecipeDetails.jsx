import { useContext, useEffect } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { RecipeDetailsContext } from "./RecipeDetailsContext";

import DetailsPreview from "./DetailsPreview";
import IngredientListInput from "./IngredientListInput";
import MakeAgain from "./MakeAgain";
import NavigateRecipeWebsite from "./NavigateRecipeWebsite";
import Notepad from "./Notepad";
import RatingSystem from "./RatingSystem";
import DateTracker from "./DateTracker";
import RecipeDetailsCategorySelect from "./RecipeDetailsCategorySelect";

const RecipeDetails = () => {
	// Import user object from auth0
	const { user } = useAuth0();

	// Get the recipeId from the params
	const { recipeId } = useParams();

	const { currentRecipeDetails, setCurrentRecipeDetails } =
		useContext(RecipeDetailsContext);

	// On mount, fetch recipe associated with the specific recipe's page we are on.
	// Store the data in the RecipeDetailsContext for the other components to have easy access to it.
	useEffect(() => {
		// If the context is empty or if the context contains a recipe different from the current RecipeDetails' page we are on, fetch the details for the page we're on.
		// if (
		// 	!currentRecipeDetails.recipeId &&
		// 	currentRecipeDetails.recipeId !== recipeId
		// ) {
		fetch(`/api/user/${user.sub}/recipes/${recipeId}`)
			.then((res) => res.json())
			.then((parsedResponse) => {
				if (parsedResponse.status === 200) {
					setCurrentRecipeDetails(parsedResponse.data);
				} else {
					throw new Error(parsedResponse);
				}
			})
			.catch((error) => {
				console.error("Fetch error:", error);
			});
		// }
	}, []);

	return (
		<>
			{currentRecipeDetails?.recipeId !== recipeId ? (
				<h1>Loading...</h1>
			) : (
				<Wrapper>
					<LeftSection>
						<DetailsPreview />
						<RatingSystem />
					</LeftSection>
					<RightSection>
						<IngredientListInput />
						<Notepad />
						<MakeAgain />
						<DateTracker />
						<RecipeDetailsCategorySelect />
						<NavigateRecipeWebsite />
					</RightSection>
				</Wrapper>
			)}
		</>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 20px auto;
	width: 90vw;
`;

const LeftSection = styled.div`
	display: flex;
	flex-direction: column;
`;

const RightSection = styled.div`
	display: flex;
	flex-direction: column;
`;

export default RecipeDetails;
