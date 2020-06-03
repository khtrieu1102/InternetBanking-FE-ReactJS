import React from "react";
import { Col, Row, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => {
	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 6, offset: 3 }} lg={6}>
					<Card className="text-center" className="mt-3 text-center">
						<Card.Header>DASHBOARD</Card.Header>
						<Card.Body>
							<Card.Title>
								Xin chào,{" "}
								<Link to="/edit">
									<span className="text-primary">Nguyễn Ngọc Khắc Triệu</span>
								</Link>
							</Card.Title>
							<Card.Text>
								Số dư khả dụng của bạn:{" "}
								<span className="text-primary">12,101,200đ</span>
							</Card.Text>
							<Col>
								<Link to="/games">
									<Button variant="primary" className="extraButton">
										Nạp tiền
									</Button>
								</Link>
							</Col>
							<Col className="mt-2">
								<Link to="/sidebar" className="extraButton">
									<Button variant="primary" className="extraButton">
										Chuyển tiền
									</Button>
								</Link>
							</Col>
						</Card.Body>
						<Card.Footer className="text-muted">
							HCMUS - PTUDWNC - 2019
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
