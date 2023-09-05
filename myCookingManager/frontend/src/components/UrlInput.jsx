import { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import { CatalogueFlowContext } from "./CatalogueFlowContext";

const UrlInput = ({ resetOnClickFunction }) => {
	//Import user object from auth0
	const { user } = useAuth0();

	// Import context to control conditional rendering
	const { catalogueFlow, setCatalogueFlow } =
		useContext(CatalogueFlowContext);

	// This state will be used to notify when the search is unsuccessful
	const [failedSearch, setFailedSearch] = useState("");

	// Initialize a useRef to bring focus to the search input with onClick function.
	const searchRef = useRef(null);

	// Fetch the submitted url only when the input contains something
	const handleFindSubmit = (event) => {
		if (
			(event === undefined &&
				catalogueFlow.recipeInfo.recipe_url.length > 0) ||
			(event?.code === "Enter" &&
				catalogueFlow.recipeInfo.recipe_url.length > 0)
		) {
			fetch(`/api/user/${user.sub}/catalogue`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					recipe_url: catalogueFlow.recipeInfo.recipe_url,
				}),
			})
				.then((res) => {
					if (res.status === 200) {
						return res.json();
					} else {
						return res;
					}
				})
				.then((parsedResponse) => {
					if (parsedResponse.status === 200) {
						// When successful, modify context to render next step in cataloguing flow.
						setCatalogueFlow({
							...catalogueFlow,
							isRecipeInput: true,
							recipeInfo: parsedResponse.data,
						});
					} else if (parsedResponse.status === 204) {
						// If not successful in a preditable way, provide feeback to the user.
						setFailedSearch(
							"The URL you pasted didn't return any results. Verify your URL and try again."
						);
					} else {
						throw new Error(parsedResponse.message);
					}
				})
				.catch((error) => {
					console.error("Fetch error:", error);
					// ------------------------------------------------------------------------------------------------ //
					// Because this endpoint interacts with a library that relies on link previews existing for an url,
					// many unexpected things can go wrong. Therefore, I want the user to understand why a link
					// is not working and provide a better user experience.
					// ------------------------------------------------------------------------------------------------ //
					setFailedSearch(
						"The URL you pasted didn't return any results. Verify your URL and try again. If still unsuccessful, maybe your recipe link is not compatible with My Cooking Manager. We apologize for the inconvenience."
					);
				});
		}
	};

	// Function that reset the context to its inital state, clear the search input and puts it in focus
	const handleClearField = () => {
		resetOnClickFunction();
		setFailedSearch("");
		searchRef.current.focus();
	};

	return (
		<Container>
			<Label htmlFor="urlInput">
				Paste the URL of the coveted recipe and click "Find" !
			</Label>
			<UrlInputContainer>
				<Input
					id="urlInput"
					type="text"
					value={catalogueFlow.recipeInfo.recipe_url}
					placeholder="Paste your recipe website address here !"
					autoFocus={!catalogueFlow.isRecipeInput}
					ref={searchRef}
					onChange={(event) =>
						setCatalogueFlow({
							...catalogueFlow,
							recipeInfo: {
								...catalogueFlow.recipeInfo,
								recipe_url: event.target.value,
							},
						})
					}
					onKeyDown={handleFindSubmit}
				/>
				{/* // Call onClick function anonymously to allow for reuse of same function as onKeyDown */}
				<Button onClick={() => handleFindSubmit()}>Find</Button>
				<Button onClick={handleClearField}>Clear</Button>
			</UrlInputContainer>
			{failedSearch && <p>{failedSearch}</p>}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: var(--secondary-color);
	height: 100px;
`;

const UrlInputContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	padding: 6px 0 6px 6px;
	width: 60vw;
	border: 2px solid var(--input-bg-color);
	background-color: var(--input-bg-color);

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const Label = styled.label`
	color: var(--primary-color);
	font-family: var(--heading-font-family);
	font-weight: bold;
	display: block;
	padding: 5px 0;
`;

const Button = styled.button`
	padding: 10px 20px;
	min-width: 80px;
	border-radius: 3px;
	background-color: var(--primary-color);
	font-family: var(--link-font-family);
	color: white;
	margin: 0 10px;
	border: 2px solid var(--primary-color);

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default UrlInput;
