import { useState } from "react";
import { styled } from "styled-components";

const SearchBar = ({ setSearchTerms, failedSearch }) => {
	const [searchField, setSearchField] = useState("");

	const handleSearchSubmit = (event) => {
		if (event === undefined && searchField) {
			setSearchTerms(searchField);
		} else if (event?.code === "Enter" && searchField) {
			setSearchTerms(searchField);
		}
	};

	const handleClearField = () => {
		setSearchField("");
		setSearchTerms("");
	};

	return (
		<Container>
			<SearchInputContainer>
				<Input
					aria-label="search"
					type="text"
					name="searchBar"
					value={searchField}
					placeholder="Write a category, a word in a recipe name or the website associated with your recipes"
					onChange={(event) => setSearchField(event.target.value)}
					onKeyDown={handleSearchSubmit}
				/>
				<Button onClick={() => handleSearchSubmit()}>Search</Button>
				<Button onClick={handleClearField}>Clear</Button>
			</SearchInputContainer>

			{/* when the back end is set up, I'll have to modify the styling of the the paragraph to see how it appears */}
			{failedSearch && <p>{failedSearch}</p>}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 100vw;
	background-color: var(--secondary-color);
	height: 100px;
`;

const SearchInputContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	padding: 6px 0 6px 6px;
	width: 60vw;
	border: 2px solid var(--secondary-color);

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const Button = styled.button`
	padding: 10px 20px;
	background-color: var(--primary-color);
	font-family: var(--link-font-family);
	color: white;
	margin: 0 10px;
	border: 2px solid var(--primary-color);

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default SearchBar;
