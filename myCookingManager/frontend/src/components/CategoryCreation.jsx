import { styled } from "styled-components";

import useAutoFocus from "../utility_functions/hooks/useAutoFocus";

const CategoryCreation = ({ label, inputOnChangeFunc, buttonClickFunc }) => {
	// Import custom useRef hook that outputs a focused ref
	const categoryInput = useAutoFocus();

	return (
		<Container>
			<Label htmlFor={label}>{label}</Label>
			<InputAndButtonDiv>
				<Input
					id={label}
					placeholder="Write your new category here !"
					onChange={(e) => inputOnChangeFunc(e.target.value)}
				/>
				<Button ref={categoryInput} onClick={() => buttonClickFunc()}>
					Create New Category
				</Button>
			</InputAndButtonDiv>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
`;

const Label = styled.label`
	color: var(--primary-color);
	font-size: 14px;
	font-family: var(--heading-font-family);
	font-weight: bold;
	display: block;
	padding: 5px 0;
`;

const InputAndButtonDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

`;

const Input = styled.input`
	padding: 6px 0 6px 6px;
	width: 250px;
	border: 2px solid var(--secondary-color);
	margin: 0 0 10px 0;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const Button = styled.button`
	background-color: var(--tertiary-color);
	color: black;
	border: 2px solid var(--tertiary-color);
	padding: 5px;
	max-width: 150px;
	border-radius: 3px;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default CategoryCreation;
