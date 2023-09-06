// ------------------------------------------------------------------------------------- //
// This function handles a rating matching the provided label and makes an average
// of the 3 ratings to set it as the "Overall" rating. It returns the "ratings" 
// array with the right ratings. The "ratings" array contains 4 objects labeled
//  "Overall", "Time Accuracy", "Easy Cleanup" and "Taste". 
// The functions needs the value of one rating (a number used by the @smastrom/react-rating
// library to handle the stars display), the label associated with that rating and
// the complete ratings array.
// ------------------------------------------------------------------------------------ //

export const allRatingsCalculator = (rating, label, arrayOfRatingObjects) => {
	const foundRating = arrayOfRatingObjects.find((rating) => {
		return rating.label === label;
	});
	foundRating.rating = rating;
	const overallRating = arrayOfRatingObjects.find((rating) => {
		return rating.label === "Overall";
	});
	let total = 0;
	arrayOfRatingObjects
		.filter((rating) => rating.label !== "Overall")
		.forEach((rating) => {
			total = rating.rating + total;
		});
	const average = total / 3;
	overallRating.rating = average.toFixed(2) * 1;

	return arrayOfRatingObjects;
};
