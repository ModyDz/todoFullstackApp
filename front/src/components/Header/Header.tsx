import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/user/userSlice";
import { toast } from "react-toastify";
import LoginIcon from "@mui/icons-material/Login";
import {
  Container,
  Logo,
  SearchContainer,
  SearchInput,
  SearchResultsContainer,
  SearchResult,
  Nav,
  NavItem,
  StyledLink,
  UserAccordion,
  AccordionItem,
  StyledMenu,
  StyledArrowDropDown,
  ProfilePicture,
  Image,
  Profile,
  NoResult,
  StyledCloseIcon,
} from "./Components";
import { AccountBox, Logout } from "@mui/icons-material";
import { useState } from "react";
import { RootState } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useLazySearchUsersQuery } from "../../redux/api/apiSlice";
import { debounce } from "../../utilities/debounce";
import { useCallback } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function Header() {
  const navigate = useNavigate();
  const [showAccordion, setShowAccordion] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const user = useSelector((state: RootState) => state.userState);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const [triggerSearch, { data, isLoading, isSuccess }] =
    useLazySearchUsersQuery();
  const [focused, setFocused] = useState(false);
  function handleLogout() {
    dispatch(logout());
    setTimeout(() => navigate("/"), 1000);
    setShowAccordion(false);
    setShowNavbar(false);
    toast.success("Logged out successfully, hope we see you soon :)");
  }
  const delayedSearch = useCallback(
    debounce(() => triggerSearch(inputRef.current!.value)),
    []
  );
  function handleSearch() {
    delayedSearch();
  }

  return (
    <Container>
      <Logo>
        <Link to="/">TodoApp</Link>
      </Logo>
      <SearchContainer
        onBlur={() => {
          setTimeout(() => setFocused(false), 100);
        }}
      >
        <SearchInput
          type="search"
          placeholder="Search users"
          ref={inputRef}
          onChange={handleSearch}
          onFocus={() => setFocused(true)}
          data={data}
          focused={focused}
        />
        <SearchResultsContainer focused={focused} data={data}>
          {isLoading && <LoadingSpinner />}
          {isSuccess && data?.length === 0 && (
            <NoResult>No user found</NoResult>
          )}
          {data?.length > 0 &&
            data.map((queriedUser: any) => {
              return (
                <SearchResult
                  key={queriedUser.username}
                  to={`/user/${queriedUser.displayName.toLowerCase()}`}
                >
                  <Image src={queriedUser.profilePicture} />
                  {queriedUser.displayName}
                </SearchResult>
              );
            })}
        </SearchResultsContainer>
      </SearchContainer>

      <Nav state={showNavbar}>
        {user ? (
          <NavItem>
            <Profile>
              <StyledLink style={{ padding: 0 }} to="/user/me">
                <ProfilePicture>
                  <Image src={user.profilePicture} />
                </ProfilePicture>

                {user.username}
              </StyledLink>
              <StyledArrowDropDown
                fontSize="large"
                onClick={() => setShowAccordion(!showAccordion)}
                style={{
                  transform: `${
                    showAccordion ? "rotate(180deg)" : "rotate(0)"
                  }`,
                  transition: "transform 0.2s ease",
                }}
              />
            </Profile>
            <UserAccordion state={showAccordion}>
              <AccordionItem onClick={handleLogout}>
                Logout <Logout style={{ marginLeft: "10px" }} />
              </AccordionItem>
            </UserAccordion>
          </NavItem>
        ) : (
          <>
            <NavItem>
              <StyledLink to="/login">
                Login <LoginIcon />
              </StyledLink>
            </NavItem>
            <NavItem type="register">
              <StyledLink to="/register">
                Register <AccountBox />
              </StyledLink>
            </NavItem>
          </>
        )}
      </Nav>
      {showNavbar ? (
        <StyledCloseIcon onClick={() => setShowNavbar(!showNavbar)} />
      ) : (
        <StyledMenu onClick={() => setShowNavbar(!showNavbar)} />
      )}
    </Container>
  );
}
