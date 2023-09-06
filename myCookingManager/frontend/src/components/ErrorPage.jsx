import { styled } from "styled-components";

const ErrorPage = () => {
	return (
		<Container>
			<Message>Sorry... </Message>
			<Message>You seem to have lost your way... </Message>
			<Message>Click on the banner to find your way back ! </Message>
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
    margin: 5px 0;
	color: var(--tertiary-color);
	font-weight: 700;
`;

export default ErrorPage;
