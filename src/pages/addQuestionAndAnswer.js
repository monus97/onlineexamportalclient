import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import logo from "../utils/logo512.png";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { allQuestion, createQuestion } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../utils/swal";
import { getQuestionsBySkill } from "../redux/actions/skillActions";
const schema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  options: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string().required("Option value is required"),
      })
    )
    .min(4, "At least 4 options are required"),
  correctOption: Yup.string().required("Correct Option is required"),
});

const AddQuestionAndAnswer = () => {
  const { paperReducer, skillReducer } = useSelector((state) => state);
  const { skillId } = skillReducer;
  
  const [response, setResponse] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {

  // }, []);

  useEffect(() => {
    if (response === true) {
      dispatch(allQuestion());
      if (paperReducer.newQuestionData.status === "success") {
         dispatch(getQuestionsBySkill(skillId));
         navigate("/getallquestionbyskill");
        // navigate("/skill");
      }
    }
  }, [response]);
  return (
    <>
      <ToastContainer />
      <Formik
        validationSchema={schema}
        initialValues={{
          question: "",
          options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
          correctOption: "",
          skillType: skillId, // Change the initial value to an empty string
        }}
        onSubmit={(values, { resetForm }) => {
          if (values) {
            dispatch(createQuestion(values));

            successAlert("success", "newQuestion added");
            dispatch(getQuestionsBySkill(skillId));
            navigate("/skill");
          } else {
            toast.error("Invalid data", {
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
          setFieldValue,
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
                          style={{ margintop: "-75px" }}
                        >
                          <h4 className="form-heading">Create Questions</h4>
                          <p className="form-heading">
                            Enter the question and its options
                          </p>
                          <div className="rowform">
                            <Row>
                              <Row>
                                <Col lg={12}>
                                  <div className="form-field">
                                    <Form.Group
                                      className="mb-3"
                                      controlId="question"
                                    >
                                      <Form.Label>Question</Form.Label>
                                      <Form.Control
                                        autoComplete="off"
                                        controlId="question"
                                        type="text"
                                        name="question"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.question}
                                        placeholder="Enter the question"
                                      />
                                      {errors.question && touched.question && (
                                        <p
                                          className="errors"
                                          style={{ color: "red" }}
                                        >
                                          {errors.question}
                                        </p>
                                      )}
                                    </Form.Group>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12}>
                                  {values.options.map((option, index) => (
                                    <div className="form-field">
                                      <div key={index}>
                                        <Form.Group
                                          className="mb-3"
                                          controlId={`options[${index}].value`}
                                        >
                                          <Form.Label>{`Option ${
                                            index + 1
                                          }`}</Form.Label>
                                          <Form.Control
                                            autoComplete="off"
                                            controlId={`options[${index}].value`}
                                            type="text"
                                            name={`options[${index}].value`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={option.value}
                                            placeholder={`Enter Option ${
                                              index + 1
                                            }`}
                                          />
                                          {errors.options &&
                                            errors.options[index] &&
                                            errors.options[index].value &&
                                            touched.options &&
                                            touched.options[index] &&
                                            touched.options[index].value && (
                                              <p
                                                className="errors"
                                                style={{ color: "red" }}
                                              >
                                                {errors.options[index].value}
                                              </p>
                                            )}
                                        </Form.Group>
                                        {index.toString() ===
                                          values.correctOption && (
                                          <p className="text-success">
                                            This option is correct.
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                  {/* <Button
                                  variant="secondary"
                                  className="default-btn w-100"
                                  onClick={() =>
                                    setFieldValue("options", [
                                      ...values.options,
                                      { value: "" },
                                    ])
                                  }
                                >
                                  Add Option
                                </Button> */}
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12}>
                                  <div className="form-field">
                                    <Form.Group
                                      className="mb-3"
                                      controlId="correctOption"
                                    >
                                      <Form.Label>Correct Option</Form.Label>
                                      <Form.Control
                                        as="select"
                                        controlId="correctOption"
                                        name="correctOption"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.correctOption}
                                      >
                                        <option value="">
                                          Select Correct Option
                                        </option>
                                        {values.options.map((option, index) => (
                                          <option
                                            key={index}
                                            value={option.value} // Set the value of the option
                                          >
                                            {`Option ${index + 1}`}
                                          </option>
                                        ))}
                                      </Form.Control>
                                      {errors.correctOption &&
                                        touched.correctOption && (
                                          <p
                                            className="errors"
                                            style={{ color: "red" }}
                                          >
                                            {errors.correctOption}
                                          </p>
                                        )}
                                    </Form.Group>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12}>
                                  <Button
                                    variant="primary"
                                    className="default-btn w-100"
                                    type="submit"
                                    value="Submit"
                                    onClick={() => setResponse}
                                  >
                                    Create Question
                                  </Button>
                                </Col>
                              </Row>
                            </Row>
                          </div>
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

export default AddQuestionAndAnswer;
