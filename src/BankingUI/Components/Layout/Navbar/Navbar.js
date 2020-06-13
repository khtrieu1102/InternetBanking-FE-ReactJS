import React from "react";
import "./Navbar.css";
import { Avatar } from "antd";
import { Navbar, Nav, NavDropdown, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
	const {
		reducerAuthorization,
		reducerUserInformation,
		setIsAuthenticated,
	} = props;
	const { authentication } = reducerAuthorization;
	const { name } = reducerUserInformation.data;
	console.log(authentication.role);

	const CustomerNavbar = () => (
		<Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
			<Link to="/">
				<Navbar.Brand href="/">SAPHASAN Bank</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Navbar.Text className="text-light">
						<Image src="./tic-tac-toe.png" className="avatar" roundedCircle />{" "}
						<span className="text-dark bold">{name}</span>
					</Navbar.Text>
				</Nav>
				<Nav>
					<Nav.Link>
						<Link to="/edit" className="text-light mr-2">
							Sửa thông tin
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/games" className="text-light mr-2">
							Quản lý nợ
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/join" className="text-light mr-2">
							Quản lý giao dịch
						</Link>
					</Nav.Link>
					<Button
						eventKey={2}
						variant="danger"
						onClick={() => {
							localStorage.removeItem("token");
							setIsAuthenticated(false);
						}}
					>
						<FontAwesomeIcon icon={faPowerOff} /> Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);

	const AdminNavbar = () => (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Link to="/">
				<Navbar.Brand href="/">INTERNET BANKING</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Navbar.Text className="text-light">
						<Image src="./tic-tac-toe.png" className="avatar" roundedCircle />{" "}
						<span className="text-light bold">{name}</span>
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
					<Button
						eventKey={2}
						variant="danger"
						onClick={() => {
							localStorage.removeItem("token");
							setIsAuthenticated(false);
							props.history.push("/login");
						}}
					>
						<FontAwesomeIcon icon={faPowerOff} /> Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);

	return authentication.role === "customer" ? (
		<CustomerNavbar />
	) : (
		<AdminNavbar />
	);
};

export default Header;
