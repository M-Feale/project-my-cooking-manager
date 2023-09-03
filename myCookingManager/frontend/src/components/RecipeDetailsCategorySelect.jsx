import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

import { RecipeDetailsContext } from "./RecipeDetailsContext";

import CategoryCreation from "./CategoryCreation";

const RecipeDetailsCategorySelect = () => {
	// temporary userId
	const userId = 1234;

	// Import the RecipeDetails context
	const { currentRecipeDetails, setCurrentRecipeDetails } =
		useContext(RecipeDetailsContext);

	// State used to store the category names from the GET request
	const [selectCategories, setSelectCategories] = useState([]);

	// State used to store a category creation flag
	const [createNewCategory, setCreateNewCategory] = useState(false);

	// State used to determine if the select should be disabled or not.
	const [isCategoryEdited, setIsCategoryEdited] = useState(false);

	// State used to determine when to change the category in the database
	const [isNewCategoryConfirmed, setIsNewCategoryConfirmed] = useState(false);

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

	useEffect(() => {
		if (isNewCategoryConfirmed) {
			console.log("ive confirmed the new category!");
			setSelectCategories([
				...selectCategories,
				currentRecipeDetails.category,
			]);
			setIsCategoryEdited(false);
			setCreateNewCategory(false);
			setIsNewCategoryConfirmed(false);
		}
	}, [isNewCategoryConfirmed]);

	const handleCategoryChange = (event) => {
		setCurrentRecipeDetails({
			...currentRecipeDetails,
			category: event.target.value,
		});
		// setIsCategoryEdited(false)
		if (event.target.value === "Unspecified Category") {
			setCreateNewCategory(true);
		}
	};
	return (
		<Wrapper>
			<Label htmlFor="category-select">Category</Label>
			<Select
				id="category-select"
				value={currentRecipeDetails.category}
				onChange={handleCategoryChange}
				disabled={!isCategoryEdited}
			>
				<Option disabled={true} value="">
					--Choose a Category--
				</Option>
				{selectCategories?.map((category, index) => {
					return (
						<Option
							key={category + index}
							disabled={createNewCategory}
						>
							{category}
						</Option>
					);
				})}
				<Option value="Unspecified Category">
					Create a New Category
				</Option>
			</Select>
			{!createNewCategory &&
				currentRecipeDetails.category &&
				(!isCategoryEdited ? (
					<button onClick={() => setIsCategoryEdited(true)}>
						Edit Category
					</button>
				) : (
					<button onClick={() => setIsCategoryEdited(false)}>
						Save Category
					</button>
				))}
			{createNewCategory && (
				<CategoryCreation
					label={"New Category Name"}
					buttonClickFunc={() => setIsNewCategoryConfirmed(true)}
					inputOnChangeFunc={() =>
						setCurrentRecipeDetails({
							...currentRecipeDetails,
							category: event.target.value,
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
	align-items: flex-start;
	padding: 20px;
	background-color: var(--secondary-color);
`;

const Label = styled.label`
	color: var(--primary-color);
	font-family: var(--heading-font-family);
	font-weight: var(--heading-font-weight);
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

export default RecipeDetailsCategorySelect;
