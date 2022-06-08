import styled from "styled-components";
import { IUser } from "../../types";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

export const TodosContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
  max-width: 1440px;
  background: url("https://res.cloudinary.com/dnici9sgk/image/upload/v1654335185/TodoApp/background_jl7vm9.jpg"),
    no-repeat, center;
  margin: 0 auto;
`;
export const TodosTitle = styled.h1`
  margin: 2rem 0;
`;
export const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  gap: 0.5rem;
  border: 1px solid black;
  margin-bottom: 0.5rem;
  background-color: white;
`;

export const Container = styled.div`
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
  position: relative;
  padding: 0 1rem;
`;
export const AddNewTodo = styled.button<{ user: IUser }>`
  display: ${(props) => (props.user ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  background-color: black;
  position: absolute;
  top: -25px;
  border-radius: 50%;
  z-index: 10;
  border: none;
  cursor: pointer;
`;
export const CompleteCheck = styled.div`
  height: 40px;
  width: 40px;
  background-color: #e6e1e1;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const StyledCheckIcon = styled(CheckIcon)``;
export const TodoText = styled.div`
  font-size: 1.6rem;
`;
export const StyledDeleteIcon = styled(DeleteIcon)`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const CenterContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
