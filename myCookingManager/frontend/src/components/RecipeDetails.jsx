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

	// Import the context that provides information about the current recipe
	const { currentRecipeDetails, setCurrentRecipeDetails } =
		useContext(RecipeDetailsContext);

	// On mount, fetch recipe associated with the specific recipe's page we are on.
	// Store the data in the RecipeDetailsContext for the other components to have easy access to it.
	useEffect(() => {
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
		
		// Reset the context when the page dismounts
		return () => {
			setCurrentRecipeDetails({
				recipeId: "",
				name: "",
				website: "",
				image: "",
				description: "",
				ratings: [
					{ label: "Overall", rating: 0 },
					{ label: "Time Accuracy", rating: 0 },
					{ label: "Easy Cleanup", rating: 0 },
					{ label: "Taste", rating: 0 },
				],
				shopping_list: [],
				dates_created: [],
				notes: [],
				make_again: null, 
				category: "",
				recipe_url: "",
			});
		};
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
	justify-content: space-evenly;
	margin: 20px auto;
	width: 90vw;
`;

const LeftSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 40vw;
`;

const RightSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 40vw;
`;

export default RecipeDetails;
