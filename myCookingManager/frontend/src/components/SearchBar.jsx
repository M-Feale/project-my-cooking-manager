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
					placeholder="Search by category, recipe name or website of origin"
					onChange={(event) => setSearchField(event.target.value)}
					onKeyDown={handleSearchSubmit}
				/>
				<Button onClick={() => handleSearchSubmit()}>Search</Button>
				<Button onClick={handleClearField}>Clear</Button>
			</SearchInputContainer>
			{!failedSearch ? (
				<FailedSearchDiv>
					<FailedSearchText></FailedSearchText>
				</FailedSearchDiv>
			) : (
				<FailedSearchDiv>
					<FailedSearchText> {failedSearch}</FailedSearchText>
				</FailedSearchDiv>
			)}
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

	background-color: white;
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
	border: 2px solid var(--input-bg-color);

	background-color: var(--input-bg-color);

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
	border-radius: 5px;

	background-color: #27540C; // darkest green

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const FailedSearchDiv = styled.div`
	width: 60vw;
	min-height: 16px; // same height as the font-size of the FailedSearchText
`;

const FailedSearchText = styled.p``;

export default SearchBar;
