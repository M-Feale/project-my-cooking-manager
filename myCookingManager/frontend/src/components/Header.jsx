import { styled } from "styled-components";

const Header = () => {
	return (
		<Wrapper>
			<BrandHeading>My Cooking Manager</BrandHeading>
            {/* condition rendering for the button to say "Register" if the User in on Homepage and not signed in/registered, "Sign out" if signed in or no button if on the signin page  */}
            <Button>
                Sign out
            </Button>
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
`;

const Button = styled.button`
    background-color: var(--tertiary-color);
    color: var(--secondary-color);
    font-size: 18px;
    padding: 10px 20px;
    outline: none;
    border: none;
    border-radius: 10px;
`;

export default Header;
