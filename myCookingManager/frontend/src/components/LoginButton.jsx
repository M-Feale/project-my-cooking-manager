import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	return (
		!isAuthenticated && (
			<ActionButton onClick={() => loginWithRedirect()}>
				Register/Sign In
			</ActionButton>
		)
	);
};

const ActionButton = styled.button`
	font-family: var(--link-font-family);
	background-color: var(--tertiary-color);
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
`;

export default LoginButton;
