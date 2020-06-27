import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import EmailForm from "./EmailForm/EmailForm";
import OtpForm from "./OtpForm/OtpForm";
import ResetPasswordForm from "./ResetPasswordForm/ResetPasswordForm";
import AlertBox from "../../Others/AlertBox/AlertBox";

const ForgotPassword = (props) => {
  const { reducerAuthorization } = props;
  const { isAuthenticated } = reducerAuthorization;
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [formVariables, setFormVariables] = useState({
    email: "",
    otp: "",
    newPassword: "",
    retypeNewPassword: "",
    error: null,
    message: "",
    isLoading: false,
  });
  const [step, setStep] = useState(0);
  const [validated, setValidated] = useState(false);

  const from = props.location.state || { from: { pathname: "/" } };

  useEffect(() => {
    setRedirectToReferrer(isAuthenticated ? true : false);
  }, [isAuthenticated]);

  const setFormError = (error, message) => {
    let alertTypes = error === null ? "success" : "danger";

    formVariables["error"] = alertTypes;
    setFormVariables({ ...formVariables });

    formVariables["message"] = message;
    setFormVariables({ ...formVariables });
  };

  const renderAlert = () => {
    if (formVariables.message)
      return (
        <AlertBox
          alertTypes={formVariables.error}
          alertMessage={formVariables.message}
        />
      );
  };

  const renderStepForm = () => {
    switch (step) {
      case 0:
        return (
          <EmailForm
            formVariables={formVariables}
            setFormVariables={setFormVariables}
            step={step}
            setStep={setStep}
            setFormError={setFormError}
          />
        );
      case 1:
        return (
          <OtpForm
            formVariables={formVariables}
            setFormVariables={setFormVariables}
            step={step}
            setStep={setStep}
            setFormError={setFormError}
          />
        );
      case 2:
        return <Redirect to="/login" />;
    }
  };

  return redirectToReferrer ? (
    <Redirect to={from} />
  ) : (
    <Row className="justify-content-md-center">
      <Col xs={10} md={6}>
        <Card border="primary" className="mt-3">
          <Card.Header>
            <Card.Title className="text-center text-dark">
              RESET PASSWORD
            </Card.Title>
          </Card.Header>
          <Card.Body>
            {renderAlert()}
            {renderStepForm()}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
