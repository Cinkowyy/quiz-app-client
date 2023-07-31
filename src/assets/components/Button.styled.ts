import styled from 'styled-components'

const gradient = 'linear-gradient(180deg, #4568DC 0%, #B06AB3 100%)'

interface IButtonProps {
    type: 'filled' | 'oultined'
}

const Button = styled.button<IButtonProps>`
    display: flex;
    width: 9.375rem;
    padding: 0.375rem 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    outline: none;
    min-width: 10rem;
    border-radius: 0.625rem;
    background: ${(props => props.type == 'filled' ? gradient : "#FAFAFA")};
    color: ${(props => props.type == 'filled' ? "#FFF" : "#4568DC")};
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    border: ${(props => props.type == 'filled' ? "none" : "2px solid #7C69C6")};
    cursor: pointer;
    transition: transform 0.25s ease-in-out;

    &:hover {
        transform: scale(1.02);
    }
`

export default Button