import { useNavigate } from "react-router";
import { styled } from "styled-components";
import { FaListUl } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";

// Library used to create and manage the star ratings
import { Rating } from "@smastrom/react-rating";

import { lastDateCalculator } from "../utility_functions/lastDateCalculator";

const RecipeCard = ({ recipe }) => {
	const navigate = useNavigate();

	// A recipe object has an array of 4 ratings. Here, the rating called "Overall" is used for the component.
	const overallRating = recipe.ratings.find((rating) => {
		return rating.label === "Overall";
	});

	// Function that calculates and returns the most recent date from the dates_created array associated with the recipe object.
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
				{/* // Modify the recipe name to shorten it for a better display */}
				{recipe.name.length > 30
					? `${recipe.name.substring(0, 30)}...`
					: recipe.name}
			</RecipeName>
			<TextAndIconContainer>
				<LeftContainer>
					<SmallItalicText>by {recipe.website}</SmallItalicText>
					{/* // Component used for the star rating. 
					// With readOnly set to true, the stars are not interactive but can display non-integer ratings. */}
					<Rating
						style={{ maxWidth: 150 }}
						readOnly={true}
						value={overallRating.rating}
					/>
					<DateCopy>
						<ItalicSpan>Last made: </ItalicSpan>
						{recipe.dates_created.length ? (
							lastDateMade
						) : (
							<ItalicSpan>Never</ItalicSpan>
						)}
					</DateCopy>
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
	font-size: 18px;
	display: block;
	text-align: center;
	padding: 5px 0;
	background-color: var(--primary-color);
	color: var(--secondary-color);
	margin: 10px 0 4px 0;

	background-color: #27540C; // darkest green
	color: white;
`;

const TextAndIconContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: calc((0.25 * 500px) - (2 * 24px));
	min-width: calc(300px - (2 * 24px));
`;

const ItalicSpan = styled.span`
	font-style: italic;
`;

const LeftContainer = styled.div`
	flex-grow: 2;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const SmallItalicText = styled.p`
	color: black;
	opacity: 0.8;
	font-style: italic;
	font-size: 14px;
`;

const DateCopy = styled.p``;

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
	margin: 2px 0;
	opacity: ${(props) => (props.$isPresent ? "1" : "0.5")};
`;

const NoteIcon = styled(FaRegNoteSticky)`
	font-size: 30px;
	display: block;
	margin: 2px 0;
	opacity: ${(props) => (props.$isPresent ? "1" : "0.5")};
`;

export default RecipeCard;
