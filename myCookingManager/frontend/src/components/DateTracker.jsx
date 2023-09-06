import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { FaTimes } from "react-icons/fa";

import { RecipeDetailsContext } from "./contexts/RecipeDetailsContext";

const DateTracker = () => {
	//Import user object from auth0
	const { user } = useAuth0();

	// Import the context that provides information about the current recipe
	const { currentRecipeDetails, setCurrentRecipeDetails } =
		useContext(RecipeDetailsContext);

	// States that store input onChange, dates in the array of dates and a flag to trigger the fetch
	const [singleDate, setSingleDate] = useState("");
	const [dates, setDates] = useState(currentRecipeDetails.dates_created);
	const [wereDatesEdited, setWereDatesEdited] = useState(false);

	useEffect(() => {
		if (wereDatesEdited) {
			fetch(
				`/api/user/${user.sub}/recipes/${currentRecipeDetails.recipeId}/update`,
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
		if (singleDate.length > 0) {
			setDates([...dates, { id: singleDate, text: singleDate }]);
			setSingleDate("");
			setWereDatesEdited(true);
		}
	};

	// ------------------------------------------------------------ //
	// Remove a date from the dates array by keeping all the ones
	// that don't match the id of the one we want to delete.
	// ------------------------------------------------------------ //
	const handleDeleteDate = (deletedDate) => {
		setDates((currentDates) => {
			return currentDates.filter((currentDate) => {
				return currentDate.id !== deletedDate.id;
			});
		});
		setWereDatesEdited(true);
	};

	// Create today's date automatically and format it nicely.
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
			<Label htmlFor="date">Days created</Label>
			<ListParent>
				{currentRecipeDetails.dates_created.map((date, index) => {
					return (
						<ListChild key={date.id + index}>
							<DateDiv>
								<DateText>{date.text}</DateText>
								{date.id && (
									<DeleteButton
										onClick={() => handleDeleteDate(date)}
									>
										<DeleteIcon />
									</DeleteButton>
								)}
							</DateDiv>
						</ListChild>
					);
				})}
			</ListParent>
			<InputAndButtonDiv>
				<ButtonDiv>
					<TodayButton onClick={handleToday}>Today</TodayButton>
					<Button
						disabled={!singleDate.length}
						onClick={() => handleClearInputAndAddDate()}
					>
						Add date manually
					</Button>
				</ButtonDiv>
				<InputDiv>
					<Input
						id="date"
						placeholder="Accepted formats: Sept 5 2023 or 02-05-2023 "
						value={singleDate}
						onChange={(ev) => setSingleDate(ev.target.value)}
					/>
				</InputDiv>
			</InputAndButtonDiv>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 20px 0;
	padding: 5px 20px 10px;

	box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
	border-radius: 5px;
`;

const Label = styled.label`
	color: var(--primary-color);
	display: block;
	padding: 5px 0;
	font-size: 18px;
	font-weight: 700;
`;

const ListParent = styled.ul`
	margin: 10px 0 10px 5px;
`;

const ListChild = styled.li`
	width: 100%;
	display: block;
`;

const InputDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	flex-grow: 1;
`;

const Input = styled.input`
	padding: 6px;
	width: 80%;
	border: 2px solid var(--input-bg-color);
	margin: 0 0 0 20px;
	background-color: var(--input-bg-color);
	font-size: 15px;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const InputAndButtonDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
`;

const ButtonDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Button = styled.button`
	background-color: var(--tertiary-color);
	color: black;
	font-weight: 500;
	border: 2px solid var(--tertiary-color);
	padding: 5px;
	width: 150px;
	border-radius: 3px;
	font-size: 15px;
	opacity: ${(props) => (props.disabled ? "0.5" : "1")};
	cursor: ${(props) => (props.disabled ? "default" : "pointer")};

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const TodayButton = styled.button`
	background-color: var(--primary-color);
	border: 2px solid var(--primary-color);
	color: var(--secondary-color);
	font-weight: 500;
	padding: 5px;
	width: 150px;
	border-radius: 3px;
	margin-bottom: 5px;
	font-size: 15px;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const DeleteButton = styled.button`
	background-color: transparent;
	border: 2px solid var(--secondary-color); // Same color as background of div
	height: 25.2px; // To be a perfect square according to dev tools.

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const DeleteIcon = styled(FaTimes)`
	width: 20px;
	height: 20px;
	opacity: 0.5;
	margin-top: 1px;
`;

const DateDiv = styled.div`
	padding: 2px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const DateText = styled.span`
	margin-right: 10px;
	font-size: 15px;
`;

export default DateTracker;
