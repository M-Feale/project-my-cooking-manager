import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();
	const handleLogin = async () => {
		await loginWithRedirect({
			appState: {
				returnTo: "/"
			}
		})
	}

	return (
		!isAuthenticated && (
			<ActionButton onClick={handleLogin}>
				Register/Sign In
			</ActionButton>
		)
	);
};

const ActionButton = styled.button`
	background-color: var(--tertiary-color);
	padding: 10px 15px;
	border-radius: 5px;
	font-weight: 400;
	text-transform: uppercase;
	color: black;

	&:focus {
		border: 2px solid black;
		outline: none;
	}
`;

export default LoginButton;
