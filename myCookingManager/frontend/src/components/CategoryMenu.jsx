import { useEffect, useState } from "react";
import { styled } from "styled-components";

const CategoryMenu = ({ setCategory }) => {
	const fakeCategories = ["All recipes", "Mains", "Desserts", "Sides"];

	// temporary userId
	const userId = 1234;

	const [menuCategories, setMenuCategories] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:4999/user/${userId}/categories`)
            .then(res => res.json())
            .then((parsedResponse) => {
                console.log(parsedResponse)
            })
            .catch((error) => {
				console.error("Fetch error:", error.message);
			});
	}, []);

	const handleCategory = (category) => {
		if (category === "All recipes") {
			setCategory("");
		} else {
			setCategory(category);
		}
	};

	return (
		<Container>
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
	width: 100vw;
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

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default CategoryMenu;
