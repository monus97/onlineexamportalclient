import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import logo from "../utils/logo512.png";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../redux/actions/authActions";
import { errorAlert, successAlert } from "../utils/swal";
import GoogleLoginComponent from "./googleLoginComponent";

const schema = Yup.object().shape({
  name: Yup.string().required(" name is required"),
  email: Yup.string().required("email required").email("Invalid email format"),
  password: Yup.string()
    .required("password required")
    .min(3, "password must be at least 5 characters"),
});

const Register = () => {
  const [response, setResponse] = useState(false);
  const { authReducer } = useSelector((state) => state);

  useEffect(() => {
    if (response === true) {
      if (authReducer.error === false) {
        successAlert("Success", "Register Successfull");
        navigate("/login");
        authReducer.message = "";
      } else if (authReducer.error === true) {
        if (authReducer.message === "Email already exists!") {
          errorAlert("oops", `${authReducer.message} please go to login page`);
        } else if (authReducer.message === "Please enter all fields!")
          errorAlert("oops", `${authReducer.message}`);
      }
    }
  }, [authReducer]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const handleGoogleSignIn = async (googleUser) => {
setResponse(true);
  try {
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
  }
};
  return (
    <>
      <ToastContainer />
      <Formik
        validationSchema={schema}
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={(values, { resetForm }) => {
          if (values) {
            setResponse(true);
            dispatch(authRegister(values));
            console.log(values, "values");
          } else {
            toast.error("Invalid Email", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          resetForm({ values: "" });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="auth-wrapper">
            <Container fluid>
              <Row>
                <Col lg={12}>
                  <div className="login-card" style={{ marginTop: "15px" }}>
                    <div>
                      <div className="login-main">
                        <form
                          className="theme-form"
                          noValidate
                          onSubmit={handleSubmit}
                        >
                          <h4 className="form-heading">Create your account</h4>
                          <div className="google_login">
                          <GoogleLoginComponent
                            onGoogleSignIn={handleGoogleSignIn}
                          />
                          </div>
                          <div className="rowform">
                            <Row>
                              <Col lg={12}>
                                <div className="form-field">
                                  <Form.Group
                                    className="mb-3 form-field"
                                    controlid="name"
                                  >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                      autoComplete="off"
                                      controlid="name"
                                      type="text"
                                      name="name"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.name}
                                      placeholder=" Name"
                                    />
                                  </Form.Group>

                                  <p
                                    className="errors"
                                    style={{ color: "red" }}
                                  >
                                    {errors.name && touched.name && errors.name}
                                  </p>
                                </div>
                              </Col>
                              <Row />
                              <Row>
                                <Col lg={12}>
                                  <div className="form-field">
                                    <Form.Group
                                      className="mb-3"
                                      controlid="email"
                                    >
                                      <Form.Label>Email address</Form.Label>
                                      <Form.Control
                                        autoComplete="off"
                                        controlid="email"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder="email@gmail.com"
                                      />
                                    </Form.Group>

                                    <p
                                      className="errors"
                                      style={{ color: "red" }}
                                    >
                                      {errors.email &&
                                        touched.email &&
                                        errors.email}
                                    </p>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12}>
                                  <div className="form-field">
                                    <Form.Group
                                      className="mb-3 position-relative"
                                      controlid="password"
                                    >
                                      <Form.Label>Password</Form.Label>
                                      <Form.Control
                                        autoComplete="off"
                                        controlid="password"
                                        type="text"
                                        placeholder="*********"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                      ></Form.Control>
                                      <div className="show-hide">
                                        <span className="show"> </span>
                                      </div>
                                    </Form.Group>

                                    <p
                                      className="errors"
                                      style={{ color: "red" }}
                                    >
                                      {errors.password &&
                                        touched.password &&
                                        errors.password}
                                    </p>
                                  </div>
                                </Col>
                              </Row>
                              {/* <Form.Group
                                className="mb-3 d-flex justify-content-between align-items-center"
                                controlId="formBasicCheckbox"
                              >
                                <Form.Check
                                  type="checkbox"
                                  label=" Remember password"
                                />
                                <span
                                  className="link"
                                  href="forget-password.html"
                                >
                                  Forgot password?
                                </span>
                              </Form.Group> */}
                              <Row>
                                <Col lg={12}>
                                  <Button
                                    variant="primary"
                                    className="login_btn reg_btn"
                                    type="submit"
                                    value="Submit"
                                  >
                                    Create Account
                                  </Button>
                                </Col>
                              </Row>
                            </Row>
                          </div>
                          <p className="signup">
                            Already have an account?
                            <Link className="link-signup" to="/login">
                              Sign in
                            </Link>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Register;
