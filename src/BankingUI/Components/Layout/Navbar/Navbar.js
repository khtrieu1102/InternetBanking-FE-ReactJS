import React from "react";
import "./Navbar.css";
import { Avatar } from "antd";
import { Navbar, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
			<Link to="/">
				<Navbar.Brand href="/">INTERNET BANKING</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Navbar.Text className="text-light">
						<Image src="./tic-tac-toe.png" className="avatar" roundedCircle />{" "}
						<span className="text-dark bold">Nguyễn Ngọc Khắc Triệu</span>
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
					<NavDropdown
						title={<FontAwesomeIcon icon={faBell} />}
						id="collasible-nav-dropdown"
					>
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">
							Another action
						</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">
							Separated link
						</NavDropdown.Item>
					</NavDropdown>
					<Button
						eventKey={2}
						variant="danger"
						onClick={() => {
							console.log("helloworld");
							// localStorage.removeItem("token");
							// setUserToken("");
						}}
					>
						<FontAwesomeIcon icon={faPowerOff} /> Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
