import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import { CatalogueFlowContext } from "../contexts/CatalogueFlowContext";
import useAutoFocus from "../../utility_functions/hooks/useAutoFocus";
import useAutoScrollIntoView from "../../utility_functions/hooks/useAutoScrollIntoView";

import CategoryCreation from "../multipage_components/CategoryCreation"

const CatalogueCategorySelect = () => {
	//Import user object from auth0
	const { user } = useAuth0();

	// Import custom useRef hook that outputs a focused ref
	const focusSelectInput = useAutoFocus();

	// Import and assign custom useRef hook that outputs a scrolled into view ref to some elements on the page
	const viewCategorySelectWrapper = useAutoScrollIntoView();
	const viewButton = useAutoScrollIntoView()

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
		<Wrapper ref={viewCategorySelectWrapper}>
			<Label htmlFor="category-select">Categorize your New Recipe</Label>
			<Select
				id="category-select"
				value={catalogueFlow.recipeInfo.category}
				onChange={handleCategoryChange}
				disabled={createNewCategory}
				ref={focusSelectInput}
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
					Create a New Category
				</Option>
			</Select>
			{!createNewCategory && catalogueFlow.recipeInfo.category && (
				<Button
					ref={viewButton}
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
	width: 80%;
	margin: 0 0 30px 0;
	padding: 10px 20px 20px;
	border-radius: 5px;
	box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
`;

const Label = styled.label`
	color: var(--primary-color);
	font-weight: 700;
	display: block;
	padding: 5px 0;
	font-size: 18px;
	margin: 5px 0;
`;

const Select = styled.select`
	font-size: 16px;
	line-height: 115%;
	border-radius: 2px;
	border: 1px solid black;
	box-sizing: border-box;
	padding: 2px 2px 5px 2px;
	text-align: center;
	font-family: var(--main-font-family);
	margin-bottom: 5px;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const Option = styled.option`
	font-size: 16px;
	line-height: 115%;
	padding: 2px 2px 5px 2px;
`;

const Button = styled.button`
	background-color: var(--tertiary-color);
	color: black;
	border: 2px solid var(--tertiary-color);
	padding: 5px;
	min-width: 150px;
	border-radius: 3px;
	margin: 10px 0;
	font-family: var(--main-font-family);
	font-weight: 500;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default CatalogueCategorySelect;
