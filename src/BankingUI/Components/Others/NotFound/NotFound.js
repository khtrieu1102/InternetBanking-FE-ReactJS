import React from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<Container fluid>
			<Row>
				<Col md={{ span: 6, offset: 3 }} lg={6}>
					<Card className="text-center" className="mt-3 text-center">
						<Card.Header>404 NOT FOUND</Card.Header>
						<Card.Body>
							<Card.Title>
								<Alert variant="danger">
									Chúng tôi không tìm thấy trang mà bạn yêu cầu!
								</Alert>
							</Card.Title>
							<Col>
								<Link to="/">
									<Button variant="primary" className="extraButton">
										Quay về trang chủ
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

export default NotFound;
