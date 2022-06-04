import { MoonLoader } from "react-spinners";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function LoadingSpinner() {
  return (
    <Container>
      <MoonLoader size={60} />
    </Container>
  );
}
