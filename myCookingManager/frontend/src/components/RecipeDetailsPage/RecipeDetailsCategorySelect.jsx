import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import { RecipeDetailsContext } from "../contexts/RecipeDetailsContext";

import CategoryCreation from "../multipage_components/CategoryCreation";

const RecipeDetailsCategorySelect = () => {
	//Import user object from auth0
	const { user } = useAuth0();

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

	// Update the category for the recipe in the database when a new category is chosen
	useEffect(() => {
		if (isNewCategoryConfirmed) {
			fetch(
				`/api/user/${user.sub}/recipes/${currentRecipeDetails.recipeId}/update`,
				{
					method: "PATCH",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						info: { category: currentRecipeDetails.category },
					}),
				}
			)
				.then((response) => response.json())
				.then((parsedResponse) => {
					if (parsedResponse.status === 200) {
						// This is where I would have a modal with a success message.
						setSelectCategories([
							...selectCategories,
							currentRecipeDetails.category,
						]);
						setIsCategoryEdited(false);
						setCreateNewCategory(false);
						setIsNewCategoryConfirmed(false);
					} else {
						throw new Error(parsedResponse.message);
					}
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});
		}
	}, [isNewCategoryConfirmed]);

	// Function that sets a chosen category to the context or activates a flag that allows for a manual category input.
	const handleCategoryChange = (event) => {
		setCurrentRecipeDetails({
			...currentRecipeDetails,
			category: event.target.value,
		});
		setIsCategoryEdited(false);
		if (event.target.value === "Unspecified Category") {
			setCreateNewCategory(true);
		}
	};
	return (
		<Wrapper>
			<Label htmlFor="category-select">Category</Label>
			<SelectAndButtonDiv>
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
						<Button onClick={() => setIsCategoryEdited(true)}>
							Edit Category
						</Button>
					) : (
						<Button onClick={() => setIsCategoryEdited(false)}>
							Save Category
						</Button>
					))}
			</SelectAndButtonDiv>
			{createNewCategory && (
				<CategoryCreation
					label={"New Category Name"}
					buttonClickFunc={() => setIsNewCategoryConfirmed(true)}
					inputOnChangeFunc={(categoryName) =>
						setCurrentRecipeDetails({
							...currentRecipeDetails,
							category: categoryName,
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
	padding: 5px 20px 10px;
	margin: 0 0 20px 0;
	border-radius: 5px;
	box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
`;

const Label = styled.label`
	color: var(--primary-color);
	display: block;
	padding: 5px 0;
	font-size: 18px;
	font-weight: 700;
`;

const SelectAndButtonDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: 10px 0 0 0;
`;

const Select = styled.select`
	font-size: 16px;
	line-height: 115%;
	border-radius: 2px;
	border: 1px solid black;
	box-sizing: border-box;
	padding: 2px 2px 5px 2px;
	text-align: center;
	margin-bottom: 5px;
	font-family: var(--main-font-family);

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const Option = styled.option`
	font-size: 16px;
	line-height: 115%;
	padding: 2px 2px 5px 2px;
	font-family: var(--main-font-family);
`;

const Button = styled.button`
	background-color: var(--tertiary-color);
	color: black;
	font-weight: 500;
	border: 2px solid var(--tertiary-color);
	padding: 5px;
	min-width: 150px;
	border-radius: 3px;
	margin: 5px 20px 9px;
	font-size: 15px;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default RecipeDetailsCategorySelect;
