import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Title,
  Para,
  InputContainer,
  InputLabel,
  Input,
  Button,
  RegisterContainer,
} from "./Components";
import { useRegisterUserMutation } from "../../redux/api/apiSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import { setUser } from "../../redux/features/user/userSlice";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    conPass: "",
  });
  const [registerUser, { data, error, isLoading, isError, isSuccess }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userState);
  const { username, email, password, conPass } = formData;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== conPass) {
      toast.error("Password do not match");
    } else {
      await registerUser(formData);
    }
  }

  useEffect(() => {
    if (isError) {
      //@ts-ignore
      const errorMessage = error.data?.message || "An error occured";
      toast.error(errorMessage);
    }
    if (isSuccess) {
      toast.success("User created successfully, redirecting you now");
      dispatch(setUser(data));
      localStorage.setItem("user", JSON.stringify(data));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (user) {
      navigate("/");
    }
  }, [isError, isSuccess]);

  return (
    <RegisterContainer>
      <Container onSubmit={handleSubmit}>
        {isLoading && <LoadingSpinner />}
        <Title>Sign Up</Title>
        <Para>
          Already a memeber?{" "}
          <Link style={{ color: "#0087ee", fontWeight: "bold" }} to="/login">
            {" "}
            Login
          </Link>
        </Para>
        <InputContainer>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            onChange={handleChange}
            type="text"
            name="username"
            id="username"
            value={username}
            required
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            value={email}
            required
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            value={password}
            required
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="conPass">Confirm Password</InputLabel>
          <Input
            onChange={handleChange}
            type="password"
            name="conPass"
            id="conPass"
            value={conPass}
            required
          />
        </InputContainer>
        <Button disabled={isLoading} type="submit">
          Sign Up
        </Button>
      </Container>
    </RegisterContainer>
  );
}
