import { styled } from "styled-components"
import ButtonStyled from "./Button.styled"
import AvatarPlaceholder from '../images/avatar-placeholder.jpg'

const TopBar = () => {
    return (
        <TopBarContainer>
            <ButtonsWrapper>
                <ButtonStyled type={'oultined'}>
                    Nowy Quiz
                </ButtonStyled>
                <ButtonStyled type={"filled"}>
                    Lista Quizów
                </ButtonStyled>
            </ButtonsWrapper>
            <AvatarCircle src={AvatarPlaceholder}/>
        </TopBarContainer>
    )
}

export default TopBar

const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ButtonsWrapper = styled.div`
    display: flex;
    column-gap: 1rem;
`

const AvatarCircle = styled.img`
    width: 3rem;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    cursor: pointer;
`