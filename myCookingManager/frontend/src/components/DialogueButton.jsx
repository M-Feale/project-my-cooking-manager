import { styled } from "styled-components";

const DialogueButton = ({ onClickFunc, text }) => {
	return (
			<Button onClick={onClickFunc}>{text}</Button>
	);
};

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

export default DialogueButton;
