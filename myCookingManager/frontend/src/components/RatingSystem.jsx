import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Rating } from "@smastrom/react-rating";
import { styled } from "styled-components";

import { RecipeDetailsContext } from "./RecipeDetailsContext";

import "@smastrom/react-rating/style.css";

const RatingSystem = () => {
	// temporary user id
	const userId = 1234;

		//Import user object from auth0
		const {user} = useAuth0()

	const { currentRecipeDetails, setCurrentRecipeDetails } =
		useContext(RecipeDetailsContext);

	const [wereRatingsEdited, setWereRatingsEdited] = useState(false);

	useEffect(() => {
		if (wereRatingsEdited) {
			console.log("the ratings have changed!!!");
			fetch(`/api/user/${user.sub}/recipes/${currentRecipeDetails.recipeId}/update`, {
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					info: { ratings: currentRecipeDetails.ratings },
				}),
			})
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
		const currentRatings = [...currentRecipeDetails.ratings];
		const foundRating = currentRatings.find((rating) => {
			return rating.label === label;
		});
		foundRating.rating = rating;
		const overallRating = currentRatings.find((rating) => {
			return rating.label === "Overall";
		});
		let total = 0;
		currentRatings
			.filter((rating) => rating.label !== "Overall")
			.forEach((rating) => {
				total = rating.rating + total;
			});
		const average = total / 3;
		overallRating.rating = average.toFixed(2) * 1;
		setCurrentRecipeDetails({
			...currentRecipeDetails,
			ratings: currentRatings,
		});
	};

	return (
		<div>
			{currentRecipeDetails.ratings
				.filter((rating) => rating.label !== "Overall")
				.map((rating) => {
					return (
						<div key={rating.label}>
							<Label>{rating.label}</Label>
							<Rating
								style={{ maxWidth: 250 }}
								value={rating.rating}
								onChange={(newRating) =>
									handleRating(newRating, rating.label)
								}
							/>
						</div>
					);
				})}
		</div>
	);
};

const Label = styled.label``;
export default RatingSystem;
