import { styled } from "styled-components";

export const Form = styled.form`
  width: 90%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
  padding-top: 10%;

  button {
    margin-top: 0.5rem;
    margin-left: auto;
  }
  a {
    color: #7c69c6;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.375rem;

  label {
    margin-left: 0.25rem;
    width: fit-content;
  }
`;

export const Input = styled.input<{iserror?: boolean}>`
  outline: none;
  outline-color: transparent;
  padding: 0.5rem;
  border: 1px solid ${props => props.iserror?"red":"#555"};
  border-radius: 0.625rem;
  transition: border-color 0.25s ease-in-out, outline 0.25s ease-in-out;

  color: #555;
  font-size: 1rem;
  font-weight: 500;

  &:focus {
    border-color: ${props => props.iserror?"red":"#7c69c6"};
    outline: 1px solid ${props => props.iserror?"red":"#7c69c6"};
  }

  &::placeholder {
    color: #a8a8a8;
    font-size: 1rem;
    font-weight: 500;
  }
`;