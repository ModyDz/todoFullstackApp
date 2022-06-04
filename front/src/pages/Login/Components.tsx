import styled from "styled-components";
export const LoginContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: url("https://res.cloudinary.com/dnici9sgk/image/upload/v1654335185/TodoApp/background_jl7vm9.jpg"),
    no-repeat, center;
`;
export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  width: 768px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
export const Title = styled.h1`
  margin-top: 1rem;
`;
export const Para = styled.p`
  margin: 1rem 0;
`;
export const InputContainer = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;
export const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: bold;
`;
export const Input = styled.input`
  display: block;
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  background-color: #eee;
  border-bottom: 2px solid lightgray;
  font-size: 1.2rem;

  &:focus {
    outline: none;
    border: 3px solid lightblue;
  }
`;
export const Button = styled.button`
  display: block;
  padding: 12px 50px;
  border-radius: 20px;
  border: none;
  font-size: 1.2rem;
  background-color: #0087ee;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 60ms ease-in;
  &:active {
    transform: scale(0.9);
  }
`;
