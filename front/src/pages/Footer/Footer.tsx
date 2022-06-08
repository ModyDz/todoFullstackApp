import { Container, Link } from "./Components";
export default function Footer() {
  return (
    <Container>
      <h3>Made by ModyDz</h3>
      <div>
        <Link href="https://github.com/ModyDz" target="_blank">
          Github
        </Link>
        <Link href="https://www.linkedin.com/in/modydz/" target="_blank">
          LinkedIn
        </Link>
      </div>
    </Container>
  );
}
