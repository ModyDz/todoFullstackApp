import Menu from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { IUser } from "../../types";
import CloseIcon from "@mui/icons-material/Close";
export const Container = styled.header`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  padding: 0.75rem 1.2rem;
  position: relative;
  & > * {
    flex: 1;
  }
  margin: 0 auto;
`;
export const Logo = styled.h1`
  font-size: 1.6rem;
  @media screen and (min-width: 768px) {
    font-size: 2.2rem;
  }
`;
export const SearchContainer = styled.div`
  position: relative;
  flex: 2;
  margin-right: 1.8rem;
  @media screen and (min-width: 768px) {
    flex: 1;
  }
`;
export const SearchInput = styled.input<{
  data: Array<IUser>;
  focused: boolean;
}>`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  border-bottom-left-radius: ${(props) => props.data && props.focused && 0};
  border-bottom-right-radius: ${(props) => props.data && props.focused && 0};
  font-size: 1.2rem;
  &:focus {
    outline: none;
    border: 3px solid lightblue;
    border-bottom: ${(props) => props.focused && props.data && "none"};
  }
`;
export const SearchResultsContainer = styled.div<{
  focused: boolean;
  data: Array<IUser>;
}>`
  position: absolute;
  width: 100%;
  max-height: 100px;
  overflow-y: auto;
  z-index: 10;
  display: ${(props) => (props.focused ? "block" : "none")};
  border: ${(props) => props.data && "3px solid lightblue"};
  border-top: none;
`;
export const SearchResult = styled(Link)`
  background-color: white;
  color: black;
  width: 100%;
  border-bottom: 1px solid gray;
  padding: 0.75rem;
  display: block;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  &:visited {
    color: black;
  }
`;

export const Nav = styled.ul<{ state: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 100;
  background: hsla(0, 0%, 0%, 0.5);
  top: 0;
  bottom: 0;
  right: 0;
  left: 40%;
  padding: min(30vh, 10rem) 2em;
  transition: transform 0.3s ease;
  backdrop-filter: blur(1px);
  transform: ${(props) => (props.state ? "translateX(0)" : "translateX(100%)")};
  @media screen and (min-width: 768px) {
    position: static;
    flex-direction: row;
    padding: 0;
    align-items: center;
    justify-content: flex-end;
    transform: translateX(0);
  }
`;
export const NavItem = styled.li<{ type?: string }>`
  width: 75%;
  text-align: center;
  position: relative;
  ${(props) => props.type === "register" && "background-color:#0087ee"};
  border-radius: 20px;
  & + & {
    margin-top: 10px;
  }
  @media screen and (min-width: 768px) {
    width: fit-content;
    & + & {
      margin-left: 10px;
      margin-top: 0;
    }
  }
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

export const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;
export const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;
export const StyledArrowDropDown = styled(ArrowDropDownIcon)`
  display: none;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;
export const UserAccordion = styled.div<{ state?: boolean }>`
  @media screen and (min-width: 768px) {
    transform: scaleY(0);
    transform: ${(props) => props.state && "scaleY(1)"};
    transform-origin: top;
    position: absolute;
    width: 100%;
    transition: transform 0.15s ease;
    z-index: 100;
    background-color: black;
  }
`;
export const AccordionItem = styled.div`
  padding: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NoResult = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: black;
  font-size: 1.2rem;
`;
export const StyledMenu = styled(Menu)`
  display: block;
  position: absolute;
  right: 5px;
  z-index: 1000;
  cursor: pointer;
  font-size: 2.4rem;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
export const StyledCloseIcon = styled(CloseIcon)`
  display: block;
  position: absolute;
  right: 5px;
  z-index: 1001;
  cursor: pointer;
  font-size: 2.4rem;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
