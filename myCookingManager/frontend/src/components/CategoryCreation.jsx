import { styled } from "styled-components";

import useAutoFocus from "../utility_functions/hooks/useAutoFocus";

const CategoryCreation= ({ label, inputOnChangeFunc, buttonClickFunc }) => {

	const categoryInput = useAutoFocus()

	return (
		<Container>
			<Label htmlFor={label}>{label}</Label>
			<Input  id={label} onChange={(e) => inputOnChangeFunc(e.target.value)} />
            <button ref={categoryInput} onClick={() => buttonClickFunc()}>Create New Category</button>
		</Container >
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	display: block;
`;

const Input = styled.input`
	padding: 6px 0 6px 6px;
	width: 40vw;
	border: 2px solid var(--secondary-color);

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default CategoryCreation;
