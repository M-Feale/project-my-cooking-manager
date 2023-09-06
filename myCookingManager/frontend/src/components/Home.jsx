import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import HeroImage from "../assets/HeroImage.jpg"

import LoginButton from "./LoginButton";

const Home = () => {
	// Import info from auth0 context
	const { user, isAuthenticated, isLoading } = useAuth0();

	const navigate = useNavigate();

	// States helping with the conditional rendering of the text.
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
			<Hero
				src={HeroImage}
				alt="Three recipes, a soup, a chocolate dessert and a salad."
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
						Add your first recipe !
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

const Hero = styled.img`
	width: 70vw;
	filter: opacity(70%);
`;

const Slogan = styled.h1`
	font-size: 40px;
	text-align: center;
	width: 60vw;
	margin: 20px 0;
	color: var(--tertiary-color);
`;

const ItalicSpan = styled.span`
	font-style: italic;
`;

const ActionContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	min-width: 400px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19),
		0 8px 30px 0 rgba(0, 0, 0, 0.18);
`;

const ActionText = styled.h2`
	margin-bottom: 16px;
	color: var(--primary-color);
	font-size: 20px;
`;

const ActionButton = styled.button`
	background-color: var(--tertiary-color);
	padding: 10px;
	border: 2px solid var(--tertiary-color);
	border-radius: 5px;
	font-weight: 500;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default Home;
