import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: black;
  color: white;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0.6rem;
`;
export const Link = styled.a`
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.3rem;
  &:hover {
    color: #0087ee;
  }
  & + & {
    margin-left: 1rem;
  }
`;
