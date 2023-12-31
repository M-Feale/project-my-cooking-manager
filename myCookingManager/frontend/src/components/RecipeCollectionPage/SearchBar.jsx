import { useState } from "react";
import { styled } from "styled-components";

const SearchBar = ({ setSearchTerms, failedSearch }) => {
	// State used to store the value of the search field during onChange
	const [searchField, setSearchField] = useState("");

	// Set the search terms only when the input contains something
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
	align-items: flex-end;
	max-width: 80vw;
	background-color: var(--secondary-color);
	height: 100px;
	margin: 0 auto;
`;

const SearchInputContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	margin: 0 30px 0 0;
	padding: 6px 0 6px 6px;
	width: 50vw;
	border: 2px solid var(--input-bg-color);
	background-color: var(--input-bg-color);
	font-family: var(--input-font-family);
	font-size: 15px;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const Button = styled.button`
	padding: 10px 20px;
	background-color: var(--primary-color);
	color: var(--secondary-color);
	margin: 0 10px;
	border: 2px solid var(--primary-color);
	border-radius: 5px;
	min-width: 85px;
	font-weight: 700;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const FailedSearchDiv = styled.div`
	width: 100%;
	min-height: 16px; // same height as the font-size of the FailedSearchText
	text-align: center;
`;

const FailedSearchText = styled.p`
	text-align: center;
`;

export default SearchBar;
