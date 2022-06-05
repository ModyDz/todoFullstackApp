import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useGetUserQuery } from "../../redux/api/apiSlice";
import {
  Container,
  ProfileContainer,
  ProfilePicture,
  Image,
  ProfileUsername,
  Button,
  CenterContainer,
} from "./Components";
import LoadingSpinner from "../../components/LoadingSpinner";
export default function UserProfile() {
  const { username } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetUserQuery(
    username?.toLowerCase() as string
  );
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userState);
  useEffect(() => {
    if (user && user?.username.toLowerCase() === username) {
      navigate("/user/me");
    }
  }, []);
  return (
    <Container>
      <ProfileContainer>
        {isLoading && <LoadingSpinner />}
        {data && isSuccess && (
          <>
            <ProfilePicture>
              <Image src={data?.profilePicture} />
            </ProfilePicture>
            <ProfileUsername>{data?.displayName}</ProfileUsername>
            <Link to="./todos">
              <Button>View todos</Button>
            </Link>
          </>
        )}
        {(!data && isSuccess) ||
          (isError && (
            <CenterContainer>
              <h1>User not found</h1>
            </CenterContainer>
          ))}
      </ProfileContainer>
    </Container>
  );
}
