import { Rating } from "@smastrom/react-rating";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

import { FaListUl } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { lastDateCalculator } from "../utility_functions/lastDateCalculator";

const RecipeCard = ({ recipe }) => {
	const navigate = useNavigate();

	const overallRating = recipe.ratings.find((rating) => {
		return rating.label === "Overall";
	});

	const arrayOfDateObjects = [...recipe.dates_created];
	const lastDateMade = lastDateCalculator(arrayOfDateObjects);

	return (
		<Wrapper
			key={recipe.recipeId}
			onClick={() => navigate(`/recipes/${recipe.recipeId}`)}
		>
			<ImageContainer>
				<Image src={recipe.image} alt={recipe.name} />
			</ImageContainer>
			<RecipeName>
				{recipe.name.length > 35
					? `${recipe.name.substring(0, 35)}...`
					: recipe.name}
			</RecipeName>
			<TextAndIconContainer>
				<LeftContainer>
					<p>by {recipe.website}</p>
					<p>Category: {recipe.category}</p>
					<Rating
						style={{ maxWidth: 150 }}
						readOnly={true}
						value={overallRating.rating}
					/>
					<p>
						Last made:{" "}
						{recipe.dates_created.length ? lastDateMade : "Never"}
					</p>
				</LeftContainer>
				<RightContainer>
					<ListIcon $isPresent={recipe.shopping_list.length} />
					<NoteIcon $isPresent={recipe.notes.length} />
				</RightContainer>
			</TextAndIconContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	max-width: 400px;
	height: 500px;
	max-height: 500px;
	border: 1px solid black;
	border-radius: 10px;
	background-color: white;
	padding: 24px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
	transition: all ease 200ms;

	&:hover {
		cursor: pointer;
		scale: 1.008;
	}
`;
const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc((0.75 * 500px) - (2 * 24px));
	overflow: hidden;
`;

const Image = styled.img`
	display: block;
	width: 100%;
`;

const RecipeName = styled.h1`
	min-width: calc(300px - (2 * 24px));
`;

const TextAndIconContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: calc((0.28 * 500px) - (2 * 24px));
	min-width: calc(300px - (2 * 24px));
`;

const LeftContainer = styled.div`
	flex-grow: 2;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const RightContainer = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: flex-end;
`;

const ListIcon = styled(FaListUl)`
	padding: 2px;
	border: 3px solid black;
	border-radius: 4px;
	font-size: 19px;
	display: block;
	opacity: ${(props) => (props.$isPresent ? "1" : "0.5")};
`;

const NoteIcon = styled(FaRegNoteSticky)`
	font-size: 30px;
	display: block;
	opacity: ${(props) => (props.$isPresent ? "1" : "0.5")};
`;

export default RecipeCard;
