import { useEffect } from "react";
import { FormEvent } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { usePostTodoMutation } from "../../redux/api/apiSlice";
import { RootState } from "../../redux/store";
import {
  TodoInputModal,
  InputContainer,
  StyledCloseIcon,
  InputLabel,
  Input,
  Button,
} from "./Components";
interface ModalProps {
  showModal: boolean;
  setShowModal(arg0: boolean): void;
}
export default function InputModal(props: ModalProps) {
  const user = useSelector((state: RootState) => state.userState);
  const [postTodo, { error, isError, isLoading, isSuccess }] =
    usePostTodoMutation();
  const [todoText, setTodoText] = useState<string>("");
  useEffect(() => {
    if (isSuccess) {
      toast.success("Todo has been successfully created");
    }
    if (isError) {
      //@ts-ignore
      const errorMessage = error.data?.message || "An error occured";
      toast.error(errorMessage);
    }
  }, [isSuccess, isError]);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await postTodo({ token: user.token, text: todoText });
    props.setShowModal(false);
  }
  return (
    <TodoInputModal state={props.showModal}>
      <InputContainer onSubmit={handleSubmit}>
        <StyledCloseIcon
          onClick={() => props.setShowModal(false)}
          fontSize="large"
          style={{ cursor: "pointer" }}
        />
        <InputLabel htmlFor="todo">Todo:</InputLabel>
        <Input
          id="todo"
          type="text"
          required
          onChange={(e) => setTodoText(e.target.value)}
          value={todoText}
        />
        <Button type="submit">Add todo</Button>
      </InputContainer>
    </TodoInputModal>
  );
}
