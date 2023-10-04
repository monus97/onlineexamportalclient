import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allQuestion,
  authLogin,
  getAllResult,
} from "../redux/actions/authActions";
import { errorAlert, successAlert } from "../utils/swal";
import { getSkills } from "../redux/actions/skillActions";
import GoogleLoginComponent from "./googleLoginComponent";

const schema = Yup.object().shape({
  email: Yup.string().required("email required").email("Invalid email format"),
  password: Yup.string()
    .required("password required")
    .min(3, "password must be at least 5 characters"),
});

const Login = () => {
  const [response, setResponse] = useState(false);
  const { authReducer } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    if (response === true) {
      console.log(authReducer.token, "authReducer");
      localStorage.setItem("user_Token", JSON.stringify(authReducer.token));
      if (authReducer.error === false) {
        successAlert("Success", "Login SuccessFull");
        authReducer.message = "";
        const role = JSON.parse(localStorage.getItem("role"));
        if (role === "user") {
          dispatch(getSkills());
          navigate("/skill");
          //   navigate("/showpaper");
        } else if (role === "admin") {
          dispatch(getAllResult());
          dispatch(allQuestion());
          dispatch(getSkills());
          navigate("/skill");
        }
      } 
    }
  }, [authReducer]);
  const navigate = useNavigate();
  const handleGoogleSignIn = async (googleUser) => {
    setResponse(true);
    try {
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Formik
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, { resetForm }) => {
          if (values) {
            setResponse(true);
            dispatch(authLogin(values));
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
            <div className="card">
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
                            <h4 className="form-heading">login Your Account</h4>
                            <div className="rowforms">
                              <div className="google_login">
                                <GoogleLoginComponent
                                  onGoogleSignIn={handleGoogleSignIn}
                                />
                              </div>
                              <Row>
                                <Col lg={12}>
                                  <div className="form-field">
                                    <Form.Group className="mb-3">
                                      <Form.Label>Email address</Form.Label>
                                      <Form.Control
                                        autoComplete="off"
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
                                <Col md={12}>
                                  <div className="form-field">
                                    <Form.Group className="mb-3">
                                      <Form.Label>Password</Form.Label>
                                      <Form.Control
                                        autoComplete="off"
                                        type="password"
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
                              <Row>
                                <Col lg={12}>
                                  <Button
                                    variant="primary"
                                    className="login_btn"
                                    type="submit"
                                    value="Submit"
                                  >
                                    Login
                                  </Button>
                                </Col>
                              </Row>
                            </div>

                            <p className="signup">
                              if You are Not Registerd? click
                              <Link className="link-signup" to="/register">
                                Sign Up
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
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
