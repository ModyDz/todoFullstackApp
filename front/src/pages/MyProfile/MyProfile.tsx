import { ChangeEvent } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import {
  Container,
  ProfileContainer,
  ProfilePicture,
  Image,
  ProfileUsername,
  TodosCount,
  Button,
  Edit,
} from "./Components";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useUpdatePictureMutation } from "../../redux/api/apiSlice";
import { updatePicture } from "../../redux/features/user/userSlice";
import { useRef } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
export default function MyProfile() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadPicture, { data, isError, isSuccess }] =
    useUpdatePictureMutation();
  const user = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(false);
  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    //@ts-ignore
    if (e.target.files) {
      try {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("upload_preset", "xjmmpzdy");
        setLoadingState(true);
        const picture = await axios.post(
          "https://api.cloudinary.com/v1_1/dnici9sgk/image/upload",
          formData
        );
        await uploadPicture({
          picture: picture.data.url,
          bearer: `Bearer ${user.token}`,
        });
        dispatch(updatePicture(data));
        toast.success("Image uploaded successfully");
      } catch (error) {
        setLoadingState(false);
        //@ts-ignore
        toast.error(error.response.data.error.message);
      }
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isSuccess) {
      setLoadingState(false);
    }
  }, [user, isSuccess, isError]);

  return (
    <Container>
      <ProfileContainer>
        <ProfilePicture onClick={() => inputRef.current!.click()}>
          <Edit>
            <EditIcon color="primary" fontSize="large" />
          </Edit>
          {loadingState && <LoadingSpinner />}
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
          />
          <Image src={user?.profilePicture} />
        </ProfilePicture>
        <ProfileUsername>{user?.username}</ProfileUsername>
        <Link to="/">
          <Button>View todos</Button>
        </Link>
      </ProfileContainer>
    </Container>
  );
}
