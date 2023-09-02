import { Rating } from "@smastrom/react-rating";
import { useContext } from "react";

import "@smastrom/react-rating/style.css";
import { styled } from "styled-components";
import { RecipeDetailsContext } from "./RecipeDetailsContext";

const RatingSystem = () => {
	const { currentRecipeDetails, setCurrentRecipeDetails } =
		useContext(RecipeDetailsContext);

	const handleRating = (rating, label) => {
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
