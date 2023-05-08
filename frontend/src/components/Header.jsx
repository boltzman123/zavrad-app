import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';


function Header() {
  const navigate=useNavigate();

  const logOff= ()=> {
    console.log("Odlogiravam te")
    localStorage.clear()
    navigate("/")
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home">My Portfolios</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/createPortfolio">Create Portfolio</Nav.Link>
        </Nav>
        <Nav.Link href="/">
          <Button onClick={logOff} variant="outline-secondary">Logout</Button>
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
