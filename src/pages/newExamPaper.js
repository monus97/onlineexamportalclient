import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSubmitPaper } from "../redux/actions/authActions";
import { successAlert } from "../utils/swal";

const ExamPaper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { skillReducer } = useSelector((state) => state);
  const { skillId } = skillReducer;
  // console.log(skillReducer, "skilllllll");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [userAnswers, setUserAnswers] = useState({});
  // console.log(userAnswers, "userAnswers");
  const [AllQuestions, setAllQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30*20);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => Math.max(0, prevTimeLeft - 1));
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      handleSubmit();
      // successAlert(
      //   "your response has been submitted",
      //   "if you want to see your result now click on ok "
      // );
      navigate("/check");
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const currentQuestion =
    skillReducer?.skilledQuestions?.allQuestions[currentQuestionIndex] || [];
  useEffect(() => {
    setAllQuestions(skillReducer?.skilledQuestions?.allQuestions);
  }, []);
  const handleNext = () => {
    if (
      currentQuestionIndex <
      skillReducer?.skilledQuestions?.allQuestions?.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion._id]: value,
    }));
  };

  const handleSubmit = () => {
    const userAnswersArray = Object?.keys(userAnswers)?.map((questionId) => ({
      questionId: questionId,
      userAnswer: userAnswers[questionId],
    }));
    const userAns = {
      skillId: skillId,
      answers: userAnswersArray,
    };
    console.log(userAns, "userAnswersArreay");

    dispatch(userSubmitPaper(userAns));
    successAlert(
      "your response has been submitted",
      "if you want to see your result now click on ok "
    );
    navigate("/check");
  };
  const isQuestionAnswered = (questionId) => {
    return userAnswers.hasOwnProperty(questionId);
  };
  return (
    <>
      <div className="container">
        <span className="remaining_time">
          Time Remaining: {minutes} m {seconds} sec
        </span>
        <div className="row">
          <div className="exam_ques_section col-md-6">
            <div className="exam_ques">
              <p>{`Q${currentQuestionIndex + 1}. ${
                currentQuestion?.question
              }`}</p>
              <div className="answer_section">
                {currentQuestion?.options?.map((option, optionIndex) => (
                  <div className="chk_box" key={optionIndex}>
                    <input
                      type="radio"
                      name={`question_${currentQuestion?._id}`}
                      value={option?.value}
                      checked={
                        userAnswers[currentQuestion?._id] === option?.value
                      }
                      onChange={handleOptionChange}
                    />
                    <span style={{ marginLeft: "10px" }}>{option?.value}</span>
                  </div>
                ))}
              </div>
              <div className="button_group">
                <button
                  className="btn_style"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                >
                  Prev
                </button>
                <button
                  className="btn_style"
                  onClick={handleNext}
                  disabled={
                    currentQuestionIndex ===
                    skillReducer?.skilledQuestions?.allQuestions?.length - 1
                  }
                >
                  Next
                </button>
                <button className="btn_style" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="monu col-md-6">
            <div className="rightquition container">
              <div className="row box">
                {AllQuestions.map((question, index) => (
                  <div
                    key={index}
                    className={`small-box col-md-2 ${
                      isQuestionAnswered(question._id) ? "answered" : ""
                    } ${currentQuestionIndex === index ? "active" : ""}`}
                    style={{
                      background: isQuestionAnswered(question._id)
                        ? "#28a745"
                        : "#6891e3",
                    }}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamPaper;
