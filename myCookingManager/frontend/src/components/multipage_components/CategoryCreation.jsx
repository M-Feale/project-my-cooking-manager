import { styled } from "styled-components";
import { useState } from "react";

import useAutoFocus from "../../utility_functions/hooks/useAutoFocus";

const CategoryCreation = ({ label, inputOnChangeFunc, buttonClickFunc }) => {
	// Import custom useRef hook that outputs a focused ref
	const categoryInput = useAutoFocus();

	// State that stores a flag for enabling/disabling category creation button
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const handleOnChange = (event) => {
		inputOnChangeFunc(event.target.value);
		setIsButtonDisabled(false);
	};

	return (
		<Container>
			<Label htmlFor={label}>{label}</Label>
			<InputAndButtonDiv>
				<Input
					id={label}
					placeholder="Write your new category here !"
					onChange={(ev) => handleOnChange(ev)}
					ref={categoryInput}
				/>
				<Button
					disabled={isButtonDisabled}
					onClick={() => buttonClickFunc()}
				>
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
	align-items: center;
	width: 100%;
`;

const Label = styled.label`
	color: var(--primary-color);
	font-size: 18px;
	font-weight: 700;
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
	border: 2px solid var(--input-bg-color);
	margin: 0 0 10px 0;
	background-color: var(--input-bg-color);
	font-family: var(--input-font-family);
	font-size: 15px;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

const Button = styled.button`
	background-color: var(--tertiary-color);
	color: black;
	font-size: 15px;
	border: 2px solid var(--tertiary-color);
	padding: 5px;
	width: 200px;
	font-weight: 500;
	border-radius: 3px;
	opacity: ${(props) => (props.disabled ? "0.5" : "1")};
	cursor: ${(props) => (props.disabled ? "default" : "pointer")};

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default CategoryCreation;
