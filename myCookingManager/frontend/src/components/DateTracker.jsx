import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { RecipeDetailsContext } from "./RecipeDetailsContext";

const DateTracker = () => {
	//temporary user id
	const userId = 1234;

	const { currentRecipeDetails, setCurrentRecipeDetails } =
		useContext(RecipeDetailsContext);

	const [singleDate, setSingleDate] = useState("");
	const [dates, setDates] = useState(currentRecipeDetails.dates_created);
	const [wereDatesEdited, setWereDatesEdited] = useState(false);

	useEffect(() => {
		if (wereDatesEdited) {
			fetch(
				`/api/user/${userId}/recipes/${currentRecipeDetails.recipeId}/update`,
				{
					method: "PATCH",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						info: { dates_created: dates },
					}),
				}
			)
				.then((response) => response.json())
				.then((parsedResponse) => {
					if (parsedResponse.status === 200) {
						// Decide if I want to add a success message for a successful ingredient list update
						console.log(parsedResponse);
						setCurrentRecipeDetails({
							...currentRecipeDetails,
							dates_created: dates,
						});
						setWereDatesEdited(false);
					} else {
						throw new Error(parsedResponse.message);
					}
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});
		}
	}, [wereDatesEdited]);

	const handleClearInputAndAddDate = () => {
		setDates([
			...dates,
			{ id: singleDate, text: singleDate },
		]);
		setSingleDate("");
		setWereDatesEdited(true);
	};

	const handleDeleteDate = (deletedDate) => {
		setDates((currentDates) => {
			return currentDates.filter((currentDate) => {
				return currentDate.id !== deletedDate.id;
			});
		});
		setWereDatesEdited(true);
	};

	const handleToday = () => {
		const todayInMill = Date.now();
		const today = new Date(todayInMill).toLocaleString("en-ca", {
			weekday: "long",
			month: "long",
			year: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: false,
		});

		setDates([...dates, { id: today, text: today }]);
		setWereDatesEdited(true);
	};

	return (
		<Wrapper>
			<h1>Days created</h1>
			<ul>
				{currentRecipeDetails.dates_created.map((date, index) => {
					return (
						<li key={date.id + index}>
							{date.text}
							{date.id && (
								<button onClick={() => handleDeleteDate(date)}>
									Delete
								</button>
							)}
						</li>
					);
				})}
			</ul>
			<input
				placeholder="Write when you created this recipe here !"
				value={singleDate}
				onChange={(ev) => setSingleDate(ev.target.value)}
			/>
			<button onClick={() => handleClearInputAndAddDate()}>
				Add date
			</button>
			<button onClick={handleToday}>Today</button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 20px 0;
	padding: 20px;
	background-color: var(--secondary-color);
`;

export default DateTracker;
