import { Rating } from "@smastrom/react-rating";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { lastDateCalculator } from "../../utility_functions/lastDateCalculator";
import { FaListUl, FaStickyNote } from "react-icons/fa";

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

			<TextContainer>
				<h1>{recipe.name}</h1>
				<p>by {recipe.website}</p>
				<p>{recipe.category}</p>
				<Rating
					style={{ maxWidth: 100 }}
					readOnly={true}
					value={overallRating.rating}
				/>
				<p>Last made: {lastDateMade}</p>
				<ListIcon />
				<FaStickyNote />
			</TextContainer>
		</Wrapper>
	);
};

const ListIcon = styled(FaListUl)`
	background-color: lightgrey;
	padding: 2px;
	border: 1px solid black;
	font-size: 20px;
	border-radius: 4px;

`;

const Wrapper = styled.div`
	height: 500px;
	max-height: 500px;
	border: 1px solid black;
	border-radius: 10px;
	background-color: white;
	padding: 24px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
`;
const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 100%;
	max-height: calc((0.8 * 500px) - (2 * 24px));
	overflow: hidden;
`;

const Image = styled.img`
	display: block;
	max-height: calc(0.8 * 500px);
	object-fit: cover;
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
`;

export default RecipeCard;
