import React from "react";
import "./Navbar.css";
import { Avatar } from "antd";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Link to="/">
				<Navbar.Brand href="/">INTERNET BANKING</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Navbar.Text className="text-light">
						<Avatar src="./tic-tac-toe.png" roundedCircle />
						<span className="text-success">Hello world</span>
					</Navbar.Text>
				</Nav>
				<Nav>
					<Nav.Link>
						<Link to="/edit" className="text-light mr-2">
							Edit profile
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/games" className="text-light mr-2">
							Games
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/join" className="text-light mr-2">
							Join Chat
						</Link>
					</Nav.Link>
					<NavDropdown title="InternetBanking" id="collasible-nav-dropdown">
						<NavDropdown.Item>
							<Link to="/receivers" className="text-light mr-2">
								Receivers
							</Link>
						</NavDropdown.Item>
						{/* <NavDropdown.Item href="#action/3.2">
							Another action
						</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">
							Separated link
						</NavDropdown.Item> */}
					</NavDropdown>
					<Button
						eventKey={2}
						variant="outline-danger"
						// onClick={() => {
						// 	localStorage.removeItem("token");
						// 	setUserToken("");
						// }}
					>
						Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
