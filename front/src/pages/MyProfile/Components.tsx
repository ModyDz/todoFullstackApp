import styled from "styled-components";
export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: url("https://res.cloudinary.com/dnici9sgk/image/upload/v1654335185/TodoApp/background_jl7vm9.jpg"),
    no-repeat, center;
`;
export const ProfileContainer = styled.div`
  display: flex;
  width: 768px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  align-items: center;
  flex-direction: column;
  padding: 2rem;
`;
export const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`;
export const Image = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  object-fit: cover;
`;
export const ProfileUsername = styled.h1`
  margin-bottom: 3rem;
`;
export const ProfileInfo = styled.div`
  display: flex;
  justify-content: center;
`;
export const TodosCount = styled.div`
  margin-bottom: 3rem;
`;
export const FollowersCount = styled.div``;
export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #0087ee;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
export const Edit = styled.div`
  display: flex;
  opacity: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
