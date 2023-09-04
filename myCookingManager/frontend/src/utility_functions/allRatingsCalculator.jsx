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
