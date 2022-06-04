import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Title,
  Para,
  InputContainer,
  InputLabel,
  Input,
  Button,
  LoginContainer,
} from "./Components";
import { useLoginUserMutation } from "../../redux/api/apiSlice";
import { setUser } from "../../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { ChangeEvent } from "react";
import { FormEvent } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userState);
  const [loginUser, { data, error, isLoading, isError, isSuccess }] =
    useLoginUserMutation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await loginUser(formData);
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully, redirecting you now...");
      dispatch(setUser(data));

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (isError) {
      //@ts-ignore
      const errorMessage = error.data?.message || "An error occured";
      toast.error(errorMessage);
    }
    if (user) {
      navigate("/");
    }
  }, [isSuccess, isError]);
  return (
    <LoginContainer>
      <Container onSubmit={handleSubmit}>
        {isLoading && <LoadingSpinner />}
        <Title>Log In</Title>
        <Para>
          Need an account?{" "}
          <Link style={{ color: "#0087ee", fontWeight: "bold" }} to="/register">
            Register
          </Link>
        </Para>
        <InputContainer>
          <InputLabel htmlFor="username">Username/Email</InputLabel>
          <Input
            type="text"
            name="username"
            id="username"
            required
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            type="password"
            name="password"
            id="password"
            required
            onChange={handleChange}
          />
        </InputContainer>

        <Button disabled={isLoading} type="submit">
          Login
        </Button>
      </Container>
    </LoginContainer>
  );
}
