import { styled } from "styled-components";

const Callback = () => {
	return (
		<Container>
			<Message>You are being redirected... Just one moment</Message>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
    flex-direction: column;
	justify-content: center;
	align-items: center;
    height: 80vh;
`;

const Message = styled.p`
	font-size: 40px;
	text-align: center;
	width: 60vw;
	margin: 20px 0;
	color: var(--tertiary-color);
    font-weight: 700;
`;

export default Callback;
