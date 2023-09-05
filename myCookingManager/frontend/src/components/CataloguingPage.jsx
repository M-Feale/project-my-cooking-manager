import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

import { CatalogueFlowContext } from "./CatalogueFlowContext";

import UrlInput from "./UrlInput";
import RecipePreview from "./RecipePreview";
import DialogueBox from "./DialogueBox";
import CatalogueCategorySelect from "./CatalogueCategorySelect";

const CataloguingPage = () => {
	//Import user object from auth0
	const { user } = useAuth0();

	// Import context to control conditional rendering
	const { catalogueFlow, setCatalogueFlow } =
		useContext(CatalogueFlowContext);

	// -------------------------------------------------------------------------- //
	// State to control a flag for an unsuccessful recipe creation.
	// It will be set to true when a person attempts to add a recipe they already
	// have in their recipe collection
	// -------------------------------------------------------------------------- //
	const [recipeAlreadyExists, setRecipeAlreadyExists] = useState({
		answer: false,
		recipeId: "",
	});

	// Import navigate
	const navigate = useNavigate();

	useEffect(() => {
		if (catalogueFlow.isCategoryConfirmed) {
			fetch(`/api/user/${user.sub}/recipes`, {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					newRecipe: catalogueFlow.recipeInfo,
				}),
			})
				.then((res) => res.json())
				.then((parsedResponse) => {
					if (parsedResponse.status === 200) {
						setCatalogueFlow({
							...catalogueFlow,
							isPutSuccessful: true,
						});
					} else if (parsedResponse.status === 206) {
						setRecipeAlreadyExists({
							answer: true,
							recipeId: parsedResponse.data,
						});
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
		setRecipeAlreadyExists({ answer: false, recipeId: "" });
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
			{!catalogueFlow.isRecipePreviewCorrect && (
				<UrlInput resetOnClickFunction={handleReset} />
			)}

			{catalogueFlow.isRecipeInput && <RecipePreview />}
			{catalogueFlow.isRecipePreviewCorrect &&
				!catalogueFlow.isCategoryConfirmed && (
					<CatalogueCategorySelect />
				)}
			{catalogueFlow.isRecipePreviewCorrect === false && (
				<DialogueBox
					title={"What do you want to do next ?"}
					buttonArray={[
						{ text: "Try Again", function: () => handleReset() },
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
							text: "Navigate to my new recipe's page!",
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
			{recipeAlreadyExists.answer && (
				<DialogueBox
					title={
						"This recipe already exists in your collection. What do you want to do next ?"
					}
					buttonArray={[
						{ text: "Try Again", function: () => handleReset() },
						{
							text: "Navigate to the recipe page",
							function: () =>
								navigate(
									`/recipes/${recipeAlreadyExists.recipeId}`
								),
						},
					]}
				/>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 30px auto;
	width: 80vw;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default CataloguingPage;
