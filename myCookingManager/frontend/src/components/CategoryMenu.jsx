import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const CategoryMenu = ({ setCategory }) => {
	//Import user object from auth0
	const { user } = useAuth0();

	// Stores the categories fetched for the current user.
	const [menuCategories, setMenuCategories] = useState([]);

	useEffect(() => {
		fetch(`/api/user/${user.sub}/categories`)
			.then((res) => res.json())
			.then((parsedResponse) => {
				if (parsedResponse.status === 200) {
					setMenuCategories(parsedResponse.data);
				} else {
					throw new Error(data.message);
				}
			})
			.catch((error) => {
				console.error("Fetch error:", error.message);
			});
	}, []);

	// --------------------------------------------------------------------------------------- //
	// Sets the category to the value of the button clicked. Results is brought back to 
	// RecipeCollection to handle fetching the recipes associated with the specified category.
	// --------------------------------------------------------------------------------------- //
	const handleCategory = (category) => {
		if (category === "All recipes") {
			setCategory("");
		} else {
			setCategory(category);
		}
	};

	return (
		<Container>
			<CategoryButton onClick={() => handleCategory("All recipes")}>
				All Recipes
			</CategoryButton>
			{menuCategories.length > 0 &&
				menuCategories.map((category) => {
					return (
						<CategoryButton
							key={category}
							onClick={() => handleCategory(category)}
						>
							{category}
						</CategoryButton>
					);
				})}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	max-width: 100vw;
	background-color: var(--tertiary-color);
	height: 100px;
`;

const CategoryButton = styled.button`
	margin: 10px;
	padding: 10px 20px;
	background-color: var(--secondary-color);
	font-family: var(--link-font-family);
	color: var(--primary-color);
	margin: 0 10px;
	border: 2px solid var(--secondary-color);
	min-width: 125px;
	border-radius: 5px;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default CategoryMenu;
