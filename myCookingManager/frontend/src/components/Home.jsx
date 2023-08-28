import { styled } from "styled-components";
import { useNavigate } from "react-router";

import ProductCarousel from "../assets/ProductCarousel.png";

const Home = () => {
	const navigate = useNavigate();

	const handleSignin = () => {
		// this function will redirect to the Auth0 eventually, now is will just make a console.log appear
		console.log("Wow, I'm redirecting to the Auth0 page!");
	};

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
				{/* current user is logged in ? <ActionText>`Welcome back, ${user}`</ActionText> : <ActionText>Start Managing now!</ActionText>  */}
				{/* <ActionText>Start Managing now!</ActionText> */}
				<ActionText>Welcome back, user !</ActionText>
				{/* current user is logged in ? <ActionButton>Browse your Recipe Collection</ActionButton>  : <ActionButton>Sign in / Register</ActionButton>  */}
				{/* <ActionButton onClick={handleSignin}>Sign in / Register</ActionButton> */}
				<ActionButton onClick={() => navigate("/recipes")}>
					Browse your Recipe Collection
				</ActionButton>
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
