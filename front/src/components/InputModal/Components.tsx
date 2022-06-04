import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
export const TodoInputModal = styled.div<{ state: boolean }>`
  position: absolute;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.state ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 100;
`;
export const TodoInput = styled.div`
  background-color: red;
  width: 400px;
  height: 400px;
`;
export const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  background-color: white;
  width: 768px;
  padding: 2rem;
  position: relative;
`;
export const InputLabel = styled.label`
  text-align: center;
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
  margin-bottom: 1rem;
  &:focus {
    outline: none;
    border: 3px solid lightblue;
  }
`;
export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px 0;
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
export const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 5px;
  right: 5px;
`;
