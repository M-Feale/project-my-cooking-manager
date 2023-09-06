import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0();

	const handleLogout = () => {
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};

	return (
		isAuthenticated && (
			<ActionButton onClick={handleLogout}>Log out</ActionButton>
		)
	);
};

const ActionButton = styled.button`
	background-color: var(--tertiary-color);
	border: 2px solid var(--tertiary-color);
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

export default LogoutButton;
