import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

// Library used to create and manage the star ratings
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import { RecipeDetailsContext } from "./RecipeDetailsContext";
import { allRatingsCalculator } from "../utility_functions/allRatingsCalculator";

const RatingSystem = () => {
	// Import user object from auth0
	const { user } = useAuth0();

	// Import the context that provides information about the current recipe
	const { currentRecipeDetails, setCurrentRecipeDetails } =
		useContext(RecipeDetailsContext);

	// State that tracks if the Ratings were edited to trigger the fetch PATCH
	const [wereRatingsEdited, setWereRatingsEdited] = useState(false);

	useEffect(() => {
		if (wereRatingsEdited) {
			fetch(
				`/api/user/${user.sub}/recipes/${currentRecipeDetails.recipeId}/update`,
				{
					method: "PATCH",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						info: { ratings: currentRecipeDetails.ratings },
					}),
				}
			)
				.then((response) => response.json())
				.then((parsedResponse) => {
					if (parsedResponse.status === 200) {
						// Decide if I want to add a success message for a successful ingredient list update
						console.log(parsedResponse);
					} else {
						throw new Error(parsedResponse.message);
					}
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});
		}
	}, [currentRecipeDetails.ratings]);

	const handleRating = (rating, label) => {
		setWereRatingsEdited(true);
		// Make a hard copy of the state to use it in the utility function
		const currentRatings = [...currentRecipeDetails.ratings];
		// ------------------------------------------------------------------------- //
		// The "ratings" array contains 4 objects labeled "Overall", "Time Accuracy",
		// "Easy Cleanup" and "Taste". This function handles the rating matching the
		// provided label and makes an average of the 3 ratings to set it as the
		// "Overall" rating. It returns the "ratings" array with the right ratings.
		// (The ones coming from the onChange input and the calculated "Overall")
		// ------------------------------------------------------------------------- //
		const modifiedRatingsArray = allRatingsCalculator(
			rating,
			label,
			currentRatings
		);
		// Set the return of the utility function to the context
		setCurrentRecipeDetails({
			...currentRecipeDetails,
			ratings: modifiedRatingsArray,
		});
	};

	return (
		<Wrapper>
			{currentRecipeDetails.ratings
				.filter((rating) => rating.label !== "Overall")
				.map((rating) => {
					return (
						<RatingAndLabelContainer key={rating.label}>
							<TitleText>{rating.label}</TitleText>
							<Rating
								visibleLabelId={rating.label}
								style={{ maxWidth: 250 }}
								value={rating.rating}
								onChange={(newRating) =>
									handleRating(newRating, rating.label)
								}
							/>
						</RatingAndLabelContainer>
					);
				})}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 20px 0;
	padding: 20px;
	background-color: var(--secondary-color);
`;

const RatingAndLabelContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const TitleText = styled.h2`
	color: var(--primary-color);
	font-family: var(--heading-font-family);
	font-weight: bold;
	display: block;
`;
export default RatingSystem;
