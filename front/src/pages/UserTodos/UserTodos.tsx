import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  TodosTitle,
  TodoContainer,
  TodoText,
  CenterContainer,
  Container,
  TodosContainer,
} from "./Components";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useGetUserTodosQuery } from "../../redux/api/apiSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
export default function UserTodos() {
  const { username } = useParams();
  const { data, isLoading, isSuccess } = useGetUserTodosQuery(
    username?.toLowerCase() as string
  );
  const user = useSelector((state: RootState) => state.userState);
  const navigate = useNavigate();
  useEffect(() => {
    if (username?.toLowerCase() === user?.username.toLowerCase()) {
      navigate("/");
    }
  }, []);
  return (
    <TodosContainer>
      <Container>
        {isLoading && <LoadingSpinner />}
        {data && (
          <>
            <TodosTitle>{data.username}</TodosTitle>
            {data?.todos.length > 0 &&
              data?.todos?.map((todo: any) => {
                return (
                  <TodoContainer key={todo._id}>
                    <TodoText
                      style={{
                        textDecoration: `${
                          todo.completed ? "line-through" : "none"
                        }`,
                      }}
                    >
                      {todo.text}
                    </TodoText>
                  </TodoContainer>
                );
              })}
            {data?.todos.length === 0 && isSuccess && (
              <CenterContainer>
                <h1>This user has not added any todos yet.</h1>
              </CenterContainer>
            )}
          </>
        )}
        {!data && !isLoading && (
          <CenterContainer>
            <h1>User not found</h1>
          </CenterContainer>
        )}
      </Container>
    </TodosContainer>
  );
}
