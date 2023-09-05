import { styled } from "styled-components";
import DialogueButton from "./DialogueButton";

const DialogueBox = ({ title, buttonArray }) => {
	return (
		<Wrapper>
			<SectionTitle>{title}</SectionTitle>
			<ButtonWrapper>
				{buttonArray.map((button) => {
					return (
						<DialogueButton
							key={button.text}
							text={button.text}
							onClickFunc={button.function}
						/>
					);
				})}
			</ButtonWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: 2px solid black;
	background-color: var(--secondary-color);
	width: 100%;
`;

const SectionTitle = styled.span`
	display: block;
	font-weight: bold;
	font-size: 20px;
	margin: 10px 0;
	text-align: center;
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin: 10px 0;
`;

export default DialogueBox;
