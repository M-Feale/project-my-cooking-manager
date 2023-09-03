import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import LoginButton from "./LoginButton";

import ProductCarousel from "../assets/ProductCarousel.png";

const Home = () => {
	// Import info from auth0 context
	const { user, isAuthenticated, isLoading } = useAuth0();

	const navigate = useNavigate();

	const [isDatabaseVerified, setIsDatabaseVerified] = useState(false);
	const [isUserNew, setIsUserNew] = useState(false);

	// Check the database to see if the auth0 user is new to My Cooking Manager.
	// If new, create the user in the database.
	useEffect(() => {
		if (!isLoading && isAuthenticated && !isDatabaseVerified && user.sub) {
			console.log("this is the user id ", user.sub);
			fetch("/api/user", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user.sub,
				}),
			})
				.then((response) => response.json())
				.then((parsedResponse) => {
					if (parsedResponse.status === 200) {
						console.log(parsedResponse);
						console.log("this user is not new");
						setIsDatabaseVerified(true);
						setIsUserNew(false);
					} else if (parsedResponse.status === 201) {
						console.log(parsedResponse);
						console.log("this user is new");
						setIsDatabaseVerified(true);
						setIsUserNew(true);
					} else {
						throw new Error(parsedResponse.message);
					}
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});
		}
	}, []);

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
			{!isAuthenticated ? (
				<ActionContainer>
					<ActionText>Start Managing now!</ActionText>
					<LoginButton />
				</ActionContainer>
			) : isUserNew ? (
				<ActionContainer>
					<ActionText>{`Nice to meet you, ${user.name}`}</ActionText>
					<ActionButton onClick={() => navigate("/catalogue")}>
						Add your first recipe!
					</ActionButton>
				</ActionContainer>
			) : (
				<ActionContainer>
					<ActionText>{`Welcome back, ${user.name}`}</ActionText>
					<ActionButton onClick={() => navigate("/recipes")}>
						Browse your Recipe Collection
					</ActionButton>
				</ActionContainer>
			)}
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
