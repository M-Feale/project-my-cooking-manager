import { styled } from "styled-components";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

const Header = () => {
	const { isAuthenticated } = useAuth0();
	const navigate = useNavigate();

	return (
		<Wrapper>
			<BrandHeading onClick={() => navigate("/")}>
				My Cooking Manager
			</BrandHeading>
			{isAuthenticated && <LogoutButton />}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: var(--primary-color);
	height: 10vh;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
`;

const BrandHeading = styled.h1`
	color: var(--secondary-color);
	font-size: var(--heading-font-size);
	font-family: var(--heading-font-family);
    cursor: pointer;
`;

// const Button = styled.button`
// 	background-color: var(--tertiary-color);
// 	color: var(--secondary-color);
// 	font-family: var(--link-font-family);
// 	font-size: 18px;
// 	padding: 10px 20px;
// 	outline: none;
// 	border: none;
// 	border-radius: 10px;
// `;

export default Header;
