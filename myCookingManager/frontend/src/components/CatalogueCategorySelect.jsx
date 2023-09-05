import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import { CatalogueFlowContext } from "./CatalogueFlowContext";
import useAutoFocus from "../utility_functions/hooks/useAutoFocus";

import CategoryCreation from "./CategoryCreation";

const CatalogueCategorySelect = () => {
	//Import user object from auth0
	const {user} = useAuth0()

	// Import custom useRef hook that outputs a focused ref
	const selectInput = useAutoFocus();

	// Import the CatalogueFlow Context
	const { catalogueFlow, setCatalogueFlow } =
		useContext(CatalogueFlowContext);

	// State used to store the category names from the GET request
	const [selectCategories, setSelectCategories] = useState([]);

	// State used to store a category creation flag
	const [createNewCategory, setCreateNewCategory] = useState(false);

	// GET all the recipe categories associated with the user's recipe collection
	useEffect(() => {
		fetch(`/api/user/${user.sub}/categories`)
			.then((res) => res.json())
			.then((parsedResponse) => {
				if (parsedResponse.status === 200) {
					setSelectCategories(parsedResponse.data);
				} else {
					throw new Error(parsedResponse.message);
				}
			})
			.catch((error) => {
				console.error("Fetch error:", error);
			});
	}, []);

	const handleCategoryChange = (event) => {
		setCatalogueFlow({
			...catalogueFlow,
			recipeInfo: {
				...catalogueFlow.recipeInfo,
				category: event.target.value,
			},
		});
		if (event.target.value === "Unspecified Category") {
			setCreateNewCategory(true);
		}
	};
	return (
		<Wrapper>
			<Label htmlFor="category-select">Categorize your New Recipe</Label>
			<Select
				id="category-select"
				value={catalogueFlow.recipeInfo.category}
				onChange={handleCategoryChange}
				disabled={createNewCategory}
				ref={selectInput}
			>
				<Option disabled={true} value="">
					--Choose a Category--
				</Option>
				{selectCategories?.map((category) => {
					return (
						<Option key={category} disabled={createNewCategory}>
							{category}
						</Option>
					);
				})}
				<Option value="Unspecified Category">
					{!catalogueFlow.recipeInfo.category
						? "Create a New Category"
						: `${catalogueFlow.recipeInfo.category}`}
				</Option>
			</Select>
			{!createNewCategory && catalogueFlow.recipeInfo.category && (
				<Button
					onClick={() =>
						setCatalogueFlow({
							...catalogueFlow,
							isCategoryConfirmed: true,
						})
					}
				>
					Save New Recipe
				</Button>
			)}
			{createNewCategory && (
				<CategoryCreation
					label={"New Category Name"}
					buttonClickFunc={() =>
						setCatalogueFlow({
							...catalogueFlow,
							isCategoryConfirmed: true,
						})
					}
					inputOnChangeFunc={(categoryName) =>
						setCatalogueFlow({
							...catalogueFlow,
							recipeInfo: {
								...catalogueFlow.recipeInfo,
								category: categoryName,
							},
						})
					}
				/>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px 0;
	background-color: var(--secondary-color);
`;

const Label = styled.label`
	color: var(--primary-color);
	font-family: var(--heading-font-family);
	font-weight: bold;
	display: block;
	padding: 5px 0;
`;

const Select = styled.select`
	font-family: var(--copy-font-family);
	font-size: 16px;
	line-height: 115%;
	border-radius: 2px;
	border: 1px solid black;
	box-sizing: border-box;
	padding: 2px 2px 5px 2px;
	text-align: center;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const Option = styled.option`
	font-size: 16px;
	line-height: 115%;
	font-family: var(--copy-font-family);
	padding: 2px 2px 5px 2px;
`;

const Button = styled.button`
	background-color: var(--tertiary-color);
	color: black;
	border: 2px solid var(--tertiary-color);
	padding: 5px;
	min-width: 80px;
	border-radius: 3px;
	margin: 10px 0;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default CatalogueCategorySelect;
