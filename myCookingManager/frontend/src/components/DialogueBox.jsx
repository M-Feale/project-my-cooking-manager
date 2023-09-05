import { styled } from "styled-components";

import DialogueButton from "./DialogueButton";

const DialogueBox = ({ title, buttonArray }) => {
	return (
		<Wrapper>
			<SectionTitle>{title}</SectionTitle>
			<ButtonWrapper>
				{buttonArray.length ? buttonArray.map((button) => {
					return (
						<DialogueButton
							key={button.text}
							text={button.text}
							onClickFunc={button.function}
						/>
					);
				}): ""}
			</ButtonWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: var(--secondary-color);
	width: 100%;
	margin: 20px 0;
	padding: 10px 20px;
	border-radius: 5px;
	box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
`;

const SectionTitle = styled.span`
	display: block;
	font-weight: bold;
	font-size: 20px;
	margin: 10px 0;
	text-align: center;
	color: var(--primary-color);
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin: 10px 0;
`;

export default DialogueBox;
