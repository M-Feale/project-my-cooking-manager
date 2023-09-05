import { styled } from "styled-components";

import useAutoFocus from "../utility_functions/hooks/useAutoFocus";

const DialogueButton = ({ onClickFunc, text }) => {
	// Import custom useRef hook that outputs a focused ref
	const buttonRef = useAutoFocus();

	return (
		<Button ref={buttonRef} onClick={onClickFunc}>
			{text}
		</Button>
	);
};

const Button = styled.button`
	padding: 10px 20px;
	background-color: var(--primary-color);
	font-family: var(--link-font-family);
	color: white;
	margin: 0 10px;
	border: 2px solid var(--primary-color);
	min-width: 100px;
	max-width: 175px;
	border-radius: 3px;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default DialogueButton;
