import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

import { CatalogueFlowContext } from "./CatalogueFlowContext";

import CreateNewCategory from "./CreateNewCategory";

const CategorySelect = () => {
	// temporary userId
	const userId = 1234;

	// Import the CatalogueFlow Context
	const { catalogueFlow, setCatalogueFlow } =
		useContext(CatalogueFlowContext);

	// State used to store the category names from the GET request
	const [selectCategories, setSelectCategories] = useState([]);

	// State used to store a category creation flag
	const [createNewCategory, setCreateNewCategory] = useState(false);

	// GET all the recipe categories associated with the user's recipe collection
	useEffect(() => {
		fetch(`/api/user/${userId}/categories`)
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
			>
				<Option disabled={true} value="">
					--Choose a Category--
				</Option>
				{selectCategories?.map((category) => {
					return <Option key={category} disabled={createNewCategory}>{category}</Option>;
				})}
				<Option value="Unspecified Category">
					{!catalogueFlow.recipeInfo.category
						? "Create a New Category"
						: `${catalogueFlow.recipeInfo.category}`}
				</Option>
			</Select>
			{createNewCategory && (
				<CreateNewCategory
					label={"New Category Name"}
					buttonClickFunc={() =>
						setCatalogueFlow({
							...catalogueFlow,
							isCategoryConfirmed: true,
						})
					}
					inputOnChangeFunc={() =>
						setCatalogueFlow({
							...catalogueFlow,
							recipeInfo: {
								...catalogueFlow.recipeInfo,
								category: event.target.value,
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

const Label = styled.label``;

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

export default CategorySelect;
