import { styled } from "styled-components";

const MakeAgain = () => {
	return (
		<Wrapper>
			<ComponentTitle>Would make recipe again?</ComponentTitle>
			<InteractionContainer>
				<LabelContainer>
					<Label htmlFor="yes">Yes</Label>
					<Label htmlFor="no">No</Label>
				</LabelContainer>

				<InputContainer>
					<Input id="yes" type="radio" name="make-again" />
					<Input id="no" type="radio" name="make-again" />
				</InputContainer>
			</InteractionContainer>
		</Wrapper>
	);
};

{
	/* <InputContainer>
<Label htmlFor="yes">Yes</Label>
<Input id="yes" type="radio" />
</InputContainer>
<InputContainer>
<Label htmlFor="no">No</Label>
<Input id="no" type="radio" />
</InputContainer> */
}

// const InputContainer = styled.div`
// 	display: flex;
// 	flex-direction: row;
// 	justify-content: flex-start;
// 	align-items: center;
// `;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 20vw;
`;
const ComponentTitle = styled.h1``;

const InteractionContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const LabelContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-right: 10px;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
`;

const Label = styled.label`
	margin: 10px;
`;

const Input = styled.input`
	width: 16px; // same as input font-size
	height: 16px; // same as input font-size
	margin: 10px;
`;

export default MakeAgain;
