import React from "react";
import "./Navbar.css";
import { Avatar } from "antd";
import {
	Navbar,
	Nav,
	NavDropdown,
	Button,
	Image,
	Badge,
} from "react-bootstrap";
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

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		setIsAuthenticated(false);
		props.history.push("/login");
	};

	const CustomerNavbar = () => (
		<Navbar collapseOnSelect expand="lg" bg="info" variant="dark" href="#x">
			<a to="/" href="#x">
				<Navbar.Brand>
					<Link to="/" className="text-light mr-2">
						SAPHASAN Bank
					</Link>
				</Navbar.Brand>
			</a>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Navbar.Text className="text-light">
						<Image src="./tic-tac-toe.png" className="avatar" roundedCircle />{" "}
					</Navbar.Text>
				</Nav>
				<Nav>
					<Nav.Link>
						<Link to="/edit" className="text-light mr-2">
							Sửa thông tin
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/debt-management" className="text-light mr-2">
							Quản lý nợ
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/transaction-management" className="text-light mr-2">
							Quản lý giao dịch
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/notification" className="text-light mr-2">
							<FontAwesomeIcon icon={faBell} />
						</Link>
					</Nav.Link>
					<Button eventKey={2} variant="danger" onClick={handleLogout}>
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
					<Button eventKey={2} variant="danger" onClick={handleLogout}>
						<FontAwesomeIcon icon={faPowerOff} /> Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);

	const EmployeeNavbar = () => (
		<Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
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
						<Link to="/new-customer" className="text-light mr-2">
							Create
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/deposit" className="text-light mr-2">
							Deposit
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to="/customer-transaction" className="text-light mr-2">
							Customer Transaction
						</Link>
					</Nav.Link>
					<Button eventKey={2} variant="danger" onClick={handleLogout}>
						<FontAwesomeIcon icon={faPowerOff} /> Logout
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);

	const renderNavbar = () => {
		switch (authentication.role) {
			case "admin": {
				return <AdminNavbar />;
			}
			case "employee": {
				return <EmployeeNavbar />;
			}
			case "customer": {
				return <CustomerNavbar />;
			}
			default: {
				return <CustomerNavbar />;
			}
		}
	};

	return <>{renderNavbar()}</>;
};

export default Header;
