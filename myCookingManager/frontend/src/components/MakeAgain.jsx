import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import { RecipeDetailsContext } from "./RecipeDetailsContext";

const MakeAgain = () => {
	//Import user object from auth0
	const { user } = useAuth0();

	// Import RecipeDetails context
	const { currentRecipeDetails } = useContext(RecipeDetailsContext);

	// State used to track Radio Button interactions
	const [radioInput, setRadioInput] = useState(null);

	// If the context has anything in it, set the radio input state to the value present in the context.
	useEffect(() => {
		if (currentRecipeDetails.recipeId) {
			setRadioInput(currentRecipeDetails.make_again);
		}
	}, []);

	// Function that handles the value of the radio input with the state
	const handleCheckboxChange = (ev) => {
		// Initialize a temporary value that will reflect the value of the radioInput state.
		let valueUserHasClickedOn;
		if (ev.target.id === "yes") {
			valueUserHasClickedOn = true;
			setRadioInput(true);
		} else {
			valueUserHasClickedOn = false;
			setRadioInput(false);
		}

		if (currentRecipeDetails.make_again !== valueUserHasClickedOn) {
			// Update the value of the make_again field in the database.
			fetch(
				`/api/user/${user.sub}/recipes/${currentRecipeDetails.recipeId}/update`,
				{
					method: "PATCH",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						info: { make_again: valueUserHasClickedOn },
					}),
				}
			)
				.then((response) => response.json())
				.then((parsedResponse) => {
					if (parsedResponse.status === 200) {
						// Decide if I want to add a success message for a successful ingredient list update
						console.log(parsedResponse.message);
					} else {
						throw new Error(parsedResponse);
					}
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});
		}
	};

	return (
		<Wrapper>
			<ComponentTitle>Would make this recipe again?</ComponentTitle>
			<InteractionContainer>
				<LabelContainer>
					<Label htmlFor="yes">Yes</Label>
					<Label htmlFor="no">No</Label>
				</LabelContainer>

				<InputContainer>
					<Input
						id="yes"
						type="radio"
						name="make-again"
						checked={radioInput === true ? true : false}
						onChange={handleCheckboxChange}
					/>
					<Input
						id="no"
						type="radio"
						name="make-again"
						checked={radioInput === false ? true : false}
						onChange={handleCheckboxChange}
					/>
				</InputContainer>
			</InteractionContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 5px 20px;

	box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
	border-radius: 5px;
`;
const ComponentTitle = styled.h2`
	color: var(--primary-color);
	display: block;
	padding: 5px 0;
	font-size: 18px;
	font-weight: 700;
`;

const InteractionContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const LabelContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
`;

const Label = styled.label`
	display: block;
	margin: 10px;
`;

const Input = styled.input`
	width: 16px; // same as label font-size
	height: 16px; // same as label font-size
	margin: 10px;
	background-color: var(--input-bg-color);
	border: 2px solid var(--input-bg-color);
	font-family: var(--input-font-family);

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default MakeAgain;
