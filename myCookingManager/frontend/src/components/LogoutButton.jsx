import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0();

	return (
        isAuthenticated && 
        <ActionButton onClick={() => logout()} >
            Log out
        </ActionButton>
        )

}

const ActionButton = styled.button`
	font-family: var(--link-font-family);
	background-color: var(--tertiary-color);
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
`;

export default LogoutButton;