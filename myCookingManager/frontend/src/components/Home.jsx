import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "./LoginButton";

import ProductCarousel from "../assets/ProductCarousel.png";

const Home = () => {
	const { user, isAuthenticated } = useAuth0();
	const navigate = useNavigate();

	return (
		<Wrapper>
			{/* // Placeholder image before the carousel is functional */}
			<HeroImage
				src={ProductCarousel}
				alt="Carousel featuring Recipe Cards of the starter recipes"
			/>
			<Slogan>
				Welcome to <ItalicSpan>My Cooking Manager</ItalicSpan>, the
				place to help you organize your online recipes!
			</Slogan>
			<ActionContainer>
				{user && isAuthenticated ? (
					<ActionText>{`Welcome back, ${user?.name}`}</ActionText>
				) : (
					<ActionText>Start Managing now!</ActionText>
				)}
				{user && isAuthenticated ? (
					<ActionButton onClick={() => navigate("/recipes")}>
						Browse your Recipe Collection
					</ActionButton>
				) : (
					<LoginButton />
				)}
			</ActionContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HeroImage = styled.img`
	width: 70vw;
`;

const Slogan = styled.h1`
	font-family: var(--heading-font-family);
	font-size: 40px;
	text-align: center;
	width: 80vw;
	margin: 20px 0;
`;

const ItalicSpan = styled.span`
	font-style: italic;
`;

const ActionContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: var(--secondary-color);
	padding: 20px;
`;

const ActionText = styled.h2`
	font-family: var(--copy-font-family);
	margin-bottom: 16px;
`;

const ActionButton = styled.button`
	font-family: var(--link-font-family);
	background-color: var(--tertiary-color);
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
`;

export default Home;
