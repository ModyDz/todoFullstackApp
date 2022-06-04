import {
  Container,
  TodosContainer,
  TodoContainer,
  CompleteCheck,
  TodoText,
  AddNewTodo,
  TodosTitle,
  CenterContainer,
  StyledCheckIcon,
  StyledDeleteIcon,
} from "./Components";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useToggleTodoMutation,
} from "../../redux/api/apiSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import InputModal from "../../components/InputModal/InputModal";
export default function Main() {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state: RootState) => state.userState);
  const { data, isSuccess, isLoading } = useGetTodosQuery(user?.token, {
    skip: user ? false : true,
  });
  const [toggleTodo] = useToggleTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  return (
    <>
      <InputModal showModal={showModal} setShowModal={setShowModal} />
      <TodosContainer>
        <Container>
          <AddNewTodo user={user} onClick={() => setShowModal(true)}>
            <AddIcon color="primary" fontSize="large" />
          </AddNewTodo>
          {user ? (
            <>
              <TodosTitle>Your todos</TodosTitle>
              {isLoading && <LoadingSpinner />}
              {data?.length > 0 &&
                data?.map((todo: any) => {
                  return (
                    <TodoContainer key={todo._id}>
                      <CompleteCheck
                        onClick={() =>
                          toggleTodo({ todoId: todo._id, token: user.token })
                        }
                        style={{
                          background: `${
                            todo.completed ? "lightgreen" : "gray"
                          }`,
                        }}
                      >
                        <StyledCheckIcon
                          style={{
                            display: `${todo.completed ? "block" : "none"}`,
                          }}
                          fontSize="large"
                        />
                      </CompleteCheck>
                      <TodoText
                        style={{
                          textDecoration: `${
                            todo.completed ? "line-through" : "none"
                          }`,
                        }}
                      >
                        {todo.text}
                      </TodoText>
                      <StyledDeleteIcon
                        fontSize="large"
                        onClick={() =>
                          deleteTodo({ todoId: todo._id, token: user.token })
                        }
                      />
                    </TodoContainer>
                  );
                })}
              {data?.length === 0 && isSuccess && (
                <CenterContainer>
                  <h1>No todos yet, use the button above to add one</h1>
                </CenterContainer>
              )}
            </>
          ) : (
            <CenterContainer>
              <h1>
                You must be{" "}
                <Link style={{ color: "#0087ee" }} to="/login">
                  Logged in
                </Link>{" "}
                in order to add todos
              </h1>
            </CenterContainer>
          )}
        </Container>
      </TodosContainer>
    </>
  );
}
