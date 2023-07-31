import { styled } from "styled-components";
import ButtonStyled from "./Button.styled";
import AvatarPlaceholder from "../images/avatar-placeholder.jpg";
import { IUserData } from "../../types/user";
import { Link } from "react-router-dom";

interface IProps {
  userData: IUserData | null;
  logout: () => void;
}

const TopBar = ({ userData, logout }: IProps) => {
  return (
    <TopBarContainer>
      <ButtonsWrapper>
        <ButtonStyled type={"oultined"}>Nowy Quiz</ButtonStyled>
        <ButtonStyled type={"filled"}>Lista Quizów</ButtonStyled>
      </ButtonsWrapper>
      <RightWrapper>
        {userData ? (
          <div>
            <p>{userData?.nickname}</p>
            <LogoutText onClick={logout}>Wyloguj</LogoutText>
          </div>
        ) : (
          <Link to="/login">Zaloguj się</Link>
        )}
        <AvatarCircle src={AvatarPlaceholder} />
      </RightWrapper>
    </TopBarContainer>
  );
};

export default TopBar;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
`;

const AvatarCircle = styled.img`
  width: 3rem;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;

  p {
    margin-bottom: 0;
  }

  a {
    text-decoration: none;
    color: #7c69c6;
  }
`;

const LogoutText = styled.p`
  font-size: 0.75rem;
  color: red;
  margin-top: 0.125rem;
  text-align: center;
  cursor: pointer;
`;
