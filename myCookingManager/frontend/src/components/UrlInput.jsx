import { useContext } from "react";
import { styled } from "styled-components";

import { CatalogueFlowContext } from "./CatalogueFlowContext";

const UrlInput = () => {
	const { catalogueFlow, setCatalogueFlow } =
		useContext(CatalogueFlowContext);

	const handleFindSubmit = (event) => {
		if (
			event === undefined &&
			catalogueFlow.recipeInfo.recipe_url.length > 0
		) {
			console.log(
				"this is when I call the grabity endpoint from the button click"
			);
			console.log(
				catalogueFlow.recipeInfo.recipe_url,
				"this is the website I was given"
			);
		} else if (
			event?.code === "Enter" &&
			catalogueFlow.recipeInfo.recipe_url.length > 0
		) {
			console.log(
				"this is when I call the grabity endpoint from the enter "
			);
			console.log(
				catalogueFlow.recipeInfo.recipe_url,
				"this is the website I was given"
			);
		}
	};

	const handleClearField = () => {
		console.log("I'm being cleared!");
		// setCatalogueFlow({
		// 	...catalogueFlow,
		// 	recipeInfo: {
		// 		...catalogueFlow.recipeInfo,
		// 		recipe_url: "",
		// 	},
		// });
	};

	return (
		<Container>
			<UrlInputContainer>
				<Label htmlFor="urlInput">
					Paste the URL of the coveted recipe and click "Find" !{" "}
				</Label>
				<Input
					id="urlInput"
					type="text"
					value={catalogueFlow.recipeInfo.recipe_url}
					placeholder="Paste your recipe website address here !"
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
