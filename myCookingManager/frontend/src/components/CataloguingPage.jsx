import { useContext, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router";

import { CatalogueFlowContext } from "./CatalogueFlowContext";

import UrlInput from "./UrlInput";
import RecipePreview from "./RecipePreview";
import DialogueBox from "./DialogueBox";
import CatalogueCategorySelect from "./CatalogueCategorySelect";

const CataloguingPage = () => {
	// Temporary userid
	const userId = 1234;

	// Import context to control conditional rendering
	const { catalogueFlow, setCatalogueFlow } =
		useContext(CatalogueFlowContext);

	// Import navigate
	const navigate = useNavigate();

	useEffect(() => {
		if (catalogueFlow.isCategoryConfirmed) {
			console.log("The category is confirmed! Time to do the put");

			fetch(`/api/user/${userId}/recipes`, {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					newRecipe: catalogueFlow.recipeInfo,
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
						console.log(
							parsedResponse,
							"this is PUT response from Cataloguing page"
						);
						setCatalogueFlow({
							...catalogueFlow,
							isPutSuccessful: true,
						});
					} else if (parsedResponse.status === 204) {
						// Do a message for an unsuccessful transaction
						console.log("this is the same recipe you already have");
					} else {
						throw new Error(parsedResponse.message);
					}
				})
				.catch((error) => {
					// Remove console.error before submitting the project
					console.error("Fetch error:", error);
				});
		}
	}, [catalogueFlow.isCategoryConfirmed]);

	const handleReset = () => {
		setCatalogueFlow({
			isRecipeInput: false,
			isRecipePreviewCorrect: null,
			isCategoryConfirmed: null,
			isPutSuccessful: null,
			recipeInfo: {
				recipeId: "",
				name: "",
				website: "",
				recipe_url: "",
				image: "",
				description: "",
				category: "",
			},
		});
	};

	const navigateAndReset = (url) => {
		handleReset();
		navigate(url);
	};

	return (
		<Wrapper>
			<UrlInput />
			{catalogueFlow.isRecipeInput && <RecipePreview />}
			{catalogueFlow.isRecipePreviewCorrect && <CatalogueCategorySelect />}
			{catalogueFlow.isRecipePreviewCorrect === false && (
				<DialogueBox
					title={"What do you want to do next ?"}
					buttonArray={[
						{
							text: "Try Again",
							function: () =>
								setCatalogueFlow({
									...catalogueFlow,
									isRecipeInput: false,
									isRecipePreviewCorrect: null,
								}),
						},
						{
							text: "Navigate to my Recipe Collection",
							function: () => navigate("/recipes"),
						},
					]}
				/>
			)}
			{catalogueFlow.isPutSuccessful && (
				<DialogueBox
					title={"What do you want to do next ?"}
					buttonArray={[
						{
							text: "Add another recipe",
							function: () => handleReset(),
						},
						{
							text: "Navigate to my new Recipe page!",
							function: () =>
								navigateAndReset(
									`/recipes/${catalogueFlow.recipeInfo.recipeId}`
								),
						},
						{
							text: "Return to my Recipe Collection",
							function: () => navigateAndReset("/recipes"),
						},
					]}
				/>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 20px auto;
	width: 80vw;
`;

export default CataloguingPage;
