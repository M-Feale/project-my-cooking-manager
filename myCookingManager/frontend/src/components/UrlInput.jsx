import { useContext, useState } from "react";
import { styled } from "styled-components";

import { CatalogueFlowContext } from "./CatalogueFlowContext";

const UrlInput = () => {
	// temporary userId
	const userId = 1234;

	// Import context
	const { catalogueFlow, setCatalogueFlow } =
		useContext(CatalogueFlowContext);

	// This state will be used to notify when thw search is unsuccessful
	const [failedSearch, setFailedSearch] = useState("");

	const handleFindSubmit = (event) => {
		if (
			(event === undefined &&
				catalogueFlow.recipeInfo.recipe_url.length > 0) ||
			(event?.code === "Enter" &&
				catalogueFlow.recipeInfo.recipe_url.length > 0)
		) {
			fetch(`/api/user/${userId}/catalogue`, {
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
						// Decide if I want to add a success message for a successful search
						console.log(parsedResponse);
						setCatalogueFlow({
							...catalogueFlow,
							isRecipeInput: true,
							recipeInfo: parsedResponse.data,
						});
					} else if (parsedResponse.status === 204) {
						// Do a message for an unsuccessful url search
						console.log(
							"The URL you pasted didn't return any results. Verify your URL and try again."
						);
						setFailedSearch(
							"The URL you pasted didn't return any results. Verify your URL and try again."
						);
					} else {
						throw new Error(parsedResponse.message);
					}
				})
				.catch((error) => {
					// Remove console.error before submitting the project
					console.error("Fetch error:", error);
					setFailedSearch(
						"The URL you pasted didn't return any results. Verify your URL and try again."
					);
				});
		}
	};

	const handleClearField = () => {
		setCatalogueFlow({
			...catalogueFlow,
			recipeInfo: {
				...catalogueFlow.recipeInfo,
				recipe_url: "",
			},
		});
		setFailedSearch("");
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
	max-width: 100%;
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
	border: 2px solid var(--secondary-color);

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const Label = styled.label``;

const Button = styled.button`
	padding: 10px 20px;
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
