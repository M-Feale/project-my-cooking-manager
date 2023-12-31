import { styled } from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LogoutButton from "./LogoutButton";

const Header = () => {
	// Import isAuthenticated from auth0 to show navigation conditionally
	const { isAuthenticated } = useAuth0();
	const navigate = useNavigate();

	return (
		<Wrapper>
			<BrandHeading onClick={() => navigate("/")}>
				My Cooking Manager
			</BrandHeading>
			<NavAndLogoutContainer>
				{isAuthenticated && (
					<>
						<NavBar>
							<NavButtons to={"/recipes"}>
								Recipe Collection
							</NavButtons>
							<NavButtons to={"/catalogue"}>
								Recipe Cataloguing
							</NavButtons>
						</NavBar>
						<LogoutButton />
					</>
				)}
			</NavAndLogoutContainer>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: var(--primary-color);
	height: 10vh;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
`;

const BrandHeading = styled.h1`
	color: var(--secondary-color);
	font-size: 50px;
	font-weight: 500;
	cursor: pointer;
`;

const NavAndLogoutContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 50vw;
`;

const NavBar = styled.div`
	width: 75%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;

const NavButtons = styled(NavLink)`
	font-size: 18px;
	margin: 0 10px;
	font-style: italic;
	font-weight: 400;
	text-transform: lowercase;
	text-decoration: none;
	color: var(--secondary-color);

	&.active {
		color: var(--tertiary-color);
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 10px;
	}
`;

export default Header;
