import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSubmitPaper } from "../redux/actions/authActions";
import { successAlert } from "../utils/swal";

const Exam = () => {
  const dispatch = useDispatch();
  const { paperReducer } = useSelector((state) => state);
  const { skillReducer } = useSelector((state) => state);
  console.log(skillReducer, "from exam paper skillReducer");
  console.log(paperReducer, "from exam paper paperReducer");
  const { authReducer } = useSelector((state) => state);
  const [AllQuestions, setAllQuestions] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [paperId, setPaperId] = useState("");
  const [remainingTime, setRemainingTime] = useState(40 * 10);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [userAnswerMap, setUserAnswerMap] = useState({});

  const navigate = useNavigate();
useEffect(() => {
  if (paperReducer?.error === false) {
    // Assuming that the userAnswerMap contains the user's answers for each question
    const initialSelectedOptions = {};
    console.log(initialSelectedOptions, "initialSelectedOptions");
    paperReducer.paperId.forEach((e) => {
      e.questions.forEach((question) => {
        const questionId = question._id;
        if (userAnswerMap[questionId]) {
          initialSelectedOptions[questionId] = userAnswerMap[questionId];
        } else {
          initialSelectedOptions[questionId] = ""; // Initialize to an empty string if no answer is available
        }
      });
    });

    setSelectedOptions(initialSelectedOptions);
    setAllQuestions(paperReducer.paperId[0]?.questions || []);
    setPaperId(paperReducer.paperId[0]?._id || "");
  } else {
    setSelectedOptions({});
    setAllQuestions([]);
    setPaperId("");
  }
}, [paperReducer, userAnswerMap]);
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [authReducer.token]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (remainingTime === 0) {
      submitPaper();
      successAlert("time out ", "your response has been submitted");
      navigate("/check");
    }
  }, [remainingTime]);

  const next = () => {
    // Save the user's selected answer for the current question
    setUserAnswerMap((prevAnswerMap) => ({
      ...prevAnswerMap,
      [AllQuestions[singleQuestion]._id]: selectedOption,
    }));
    setSingleQuestion((prevState) => prevState + 1);
  };

  const previous = () => {
    if (singleQuestion > 0) {
      setSingleQuestion((prevState) => prevState - 1);
    }
  };

  const handleOptionChange = (questionId, optionValue) => {
    setUserAnswerMap((prevAnswerMap) => ({
      ...prevAnswerMap,
      [questionId]: optionValue,
    }));
  };

  const selectedQuestions = (el, id) => {
    setSelectedOption(el.value);
    const data = [...selectedQuestion];

    if (data?.includes(id)) {
      setSelectedQuestion(data);
    } else {
      setSelectedQuestion([...selectedQuestion, id]);
    }
  };

  const submitPaper = () => {
    // Save the user's selected answer for the current question before submitting
    setUserAnswerMap((prevAnswerMap) => ({
      ...prevAnswerMap,
      [AllQuestions[singleQuestion]._id]: selectedOption,
    }));

    // Convert the userAnswerMap object to an array of { questionId, userAnswer } objects
    const userAnswers = Object.keys(userAnswerMap).map((questionId) => ({
      questionId,
      userAnswer: userAnswerMap[questionId],
    }));

    let userAns = {
      paperId: paperId,
      answers: userAnswers,
    };
    dispatch(userSubmitPaper(userAns));
    successAlert(
      "your response has been submitted",
      "if you want to see your result now click on ok "
    );
    navigate("/check");
  };

  return (
    <>
      <div className=" container">
        <div className="row">
          <div className="exam_ques_section col-md-6">
            <div className="exam_ques">
              <span className="remaining_time">
                Remaining Time:{" "}
                <h4 style={{ color: "red" }}>{formatTime(remainingTime)}</h4>
              </span>
              <span className="paper_name">{paperReducer?.paperId?.name}</span>

              <span>
                <h2>
                  Ques.no.{`${singleQuestion + 1}   `}
                  {AllQuestions[singleQuestion]?.question}
                </h2>
              </span>
              <div className="answer_section">
                {AllQuestions?.[singleQuestion]?.options?.map((ele, i) => (
                  <div className="chk_box" key={ele._id}>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        selectedQuestions(ele, AllQuestions[singleQuestion]._id)
                      }
                    >
                      <input
                        type="radio"
                        name={`question_${AllQuestions[singleQuestion]._id}`}
                        checked={
                          selectedOptions[AllQuestions[singleQuestion]._id] ===
                          ele.value
                        }
                        onChange={() =>
                          handleOptionChange(
                            AllQuestions[singleQuestion]._id,
                            ele.value
                          )
                        }
                      />
                      <span style={{ marginLeft: "10px" }}>{ele.value}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="button_group">
                <button className="btn_style" onClick={() => previous()}>
                  Prev
                </button>
                <button className="btn_style" onClick={() => next()}>
                  Next
                </button>
                <button className="btn_style" onClick={submitPaper}>
                  finish
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
                      selectedQuestion.includes(index) ? "active" : ""
                    }`}
                    style={{
                      background: selectedQuestion.includes(question._id)
                        ? "#28a745"
                        : "#ff6666",
                    }}
                    onClick={() => setSingleQuestion(index)}
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

export default Exam;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { userSubmitPaper } from "../redux/actions/authActions";
// import { successAlert } from "../utils/swal";

// const Exam = () => {
//   const dispatch = useDispatch();
//   const { paperReducer } = useSelector((state) => state);
//   const { authReducer } = useSelector((state) => state);
//   // console.log(authReducer, "authReducer");
//   const [AllQuestions, setAllQuestions] = useState([]);
//   const [singleQuestion, setSingleQuestion] = useState(0);
//   const [selectedQuestion, setSelectedQuestion] = useState([]);
//   const [selectedOption, setSelectedOption] = useState("");
//   // console.log(selectedOption, "selectedOption form paper");
//   const [paperId, setPaperId] = useState("");
//   const [remainingTime, setRemainingTime] = useState(40 * 10);
//   const [selectedOptions, setSelectedOptions] = useState({});
//  const [userAnswerMap, setUserAnswerMap] = useState({});
//   const [userAnswers, setUserAnswers] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (paperReducer?.error === false) {
//       paperReducer.paperId.map((e, i) => {
//         console.log(i, "i");
//         setAllQuestions(e.questions);
//         setPaperId(e._id);
//       });
//     } else {
//       // console.log("kjfgbdskfvb");
//       setAllQuestions([]);
//     }
//   }, [paperReducer]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setRemainingTime((prevTime) => prevTime - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [authReducer.token]);

//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = timeInSeconds % 60;
//     return `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}`;
//   };
//   useEffect(() => {
//     if (remainingTime === 0) {
//       submitPaper();
//       successAlert("time out ", "your response has been submitted");
//       navigate("/check");
//     }
//   }, [remainingTime]);
//   // const next = () => {
//   //   let obj = {
//   //     questionId: AllQuestions?.[singleQuestion]?._id,
//   //     userAnswer: selectedOption,
//   //   };
//   //   // if (selectedOption !== "") {
//   //   setSingleQuestion((prevState) => prevState + 1);
//   //   // }
//   // };
//    const next = () => {
//      // Save the user's selected answer for the current question
//      setUserAnswerMap((prevAnswerMap) => ({
//        ...prevAnswerMap,
//        [AllQuestions[singleQuestion]._id]: selectedOption,
//      }));
//      setSingleQuestion((prevState) => prevState + 1);
//    };

//    const previous = () => {
//      if (singleQuestion > 0) {
//        setSingleQuestion((prevState) => prevState - 1);
//      }
//    };
//   // console.log(paperId,"paerId")

//   const submitPaper = () => {
//     // Save the user's selected answer for the current question before submitting
//     setUserAnswerMap((prevAnswerMap) => ({
//       ...prevAnswerMap,
//       [AllQuestions[singleQuestion]._id]: selectedOption,
//     }));

//     // Convert the userAnswerMap object to an array of { questionId, userAnswer } objects
//     const userAnswers = Object.keys(userAnswerMap).map((questionId) => ({
//       questionId,
//       userAnswer: userAnswerMap[questionId],
//     }));

//     let userAns = {
//       paperId: paperId,
//       answers: userAnswers,
//     };
//     dispatch(userSubmitPaper(userAns));
//     successAlert(
//       "your response has been submitted",
//       "if you want to see your result now click on ok "
//     );
//     navigate("/check");
//   };

//     const handleOptionChange = (questionId, optionValue) => {
//       setUserAnswerMap((prevAnswerMap) => ({
//         ...prevAnswerMap,
//         [questionId]: optionValue,
//       }));
//     };

//   const selectedQuestions = (el, id) => {
//     setSelectedOption(el.value);
//     const data = [...selectedQuestion];

//     if (data?.includes(id)) {
//       // console.log(data);
//       setSelectedQuestion(data);
//     } else {
//       setSelectedQuestion([...selectedQuestion, id]);
//     }
//   };
//   console.log(userAnswers,"userAnswers")
//   return (
//     <>
//       <div className=" container">
//         <div className="row">
//           <div className="exam_ques_section col-md-6">
//             <div className="exam_ques">
//               <span className="remaining_time">
//                 Remaining Time:{" "}
//                 <h4 style={{ color: "red" }}>{formatTime(remainingTime)}</h4>
//               </span>
//               <span className="paper_name">{paperReducer?.paperId?.name}</span>

//               <span>
//                 {/* {AllQuestions.length > 0 ? ( */}
//                 <h2>
//                   Ques.no.{`${singleQuestion + 1}   `}
//                   {AllQuestions[singleQuestion]?.question}
//                 </h2>
//                 {/* // ) : (
//             //   <p>No questions found.</p>
//             // )} */}
//               </span>
//               <div className="answer_section">
//                 {AllQuestions?.[singleQuestion]?.options?.map((ele, i) => (
//                   <div className="chk_box" key={ele._id}>
//                     <span
//                       style={{ cursor: "pointer" }}
//                       onClick={() =>
//                         selectedQuestions(ele, AllQuestions[singleQuestion]?._id)
//                       }
//                     >
//                       {/* <input
//                         type="radio"
//                         name="answers"
//                         checked={selectedOption === ele?.value}
//                       /> */}
//                       <input
//                         type="radio"
//                         name={`question_${AllQuestions[singleQuestion]?._id}`}
//                         checked={
//                           selectedOptions[AllQuestions[singleQuestion]?._id] ===
//                           ele.value
//                         }
//                         onChange={() =>
//                           handleOptionChange(
//                             AllQuestions[singleQuestion]?._id,
//                             ele.value
//                           )
//                         }
//                       />
//                       <span style={{ marginLeft: "10px" }}>{ele.value}</span>
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="button_group">
//                 <button className="btn_style" onClick={() => previous()}>
//                   Prev
//                 </button>
//                 <button className="btn_style" onClick={() => next()}>
//                   Next
//                 </button>
//                 <button className="btn_style" onClick={submitPaper}>
//                   finish
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="monu col-md-6">
//             <div className="rightquition container">
//               <div className="row box">
//                 {AllQuestions.map((question, index) => (
//                   <div
//                     key={index}
//                     className={`small-box col-md-2 ${
//                       selectedQuestion.includes(index) ? "active" : ""
//                     }`}
//                     style={{
//                       background: selectedQuestion.includes(question._id)
//                         ? "#28a745"
//                         : "",
//                     }}
//                     onClick={() => setSingleQuestion(index)}
//                   >
//                     {index + 1}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { userSubmitPaper } from "../redux/actions/authActions";
// // import { successAlert } from "../utils/swal";

// // const Exam = () => {
// //   const dispatch = useDispatch();
// //   const { paperReducer } = useSelector((state) => state);
// //   const { authReducer } = useSelector((state) => state);
// //   const [AllQuestions, setAllQuestions] = useState([]);
// //   const [singleQuestion, setSingleQuestion] = useState(0);
// //   const [selectedOption, setSelectedOption] = useState("");
// //   const [paperId, setPaperId] = useState("");
// //   const [remainingTime, setRemainingTime] = useState(40 * 1000);
// //   const [userAnswers, setUserAnswers] = useState([]);
// //   const navigate = useNavigate();
// //   console.log(754387, singleQuestion);
// //   useEffect(() => {
// //     if (paperReducer?.error === false) {
// //       paperReducer.paperId.map((e) => {
// //         setAllQuestions(e.questions);
// //         setPaperId(e._id);
// //       });
// //     } else {
// //       setAllQuestions([]);
// //     }
// //   }, [paperReducer]);

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setRemainingTime((prevTime) => prevTime - 1000);
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, [authReducer.token]);

// //   useEffect(() => {
// //     if (remainingTime === 0) {
// //       submitPaper();
// //       successAlert("Time out ", "Your response has been submitted");
// //       navigate("/check");
// //     }
// //   }, [remainingTime]);

// //   const formatTime = (timeInSeconds) => {
// //     const minutes = Math.floor(timeInSeconds / 60);
// //     const seconds = timeInSeconds % 60;
// //     return `${minutes.toString().padStart(2, "0")}:${seconds
// //       .toString()
// //       .padStart(2, "0")}`;
// //   };

// //   const next = () => {
// //     setUserAnswers((prevAnswers) => [
// //       ...prevAnswers,
// //       {
// //         questionId: AllQuestions?.[singleQuestion]?._id,
// //         userAnswer: selectedOption,
// //       },
// //     ]);
// //     setSingleQuestion((prevState) => prevState + 1);
// //   };

// //   const previous = () => {
// //     if (singleQuestion > 0) {
// //       setSingleQuestion((prevState) => prevState - 1);
// //     }
// //   };

// //   const handleQuestionClick = (index) => {
// //     if (userAnswers.some((ans) => ans.questionId === AllQuestions[index]._id)) {
// //       // If the question is answered, update the active question
// //       setSingleQuestion(index);
// //     } else {
// //       // If the question is unanswered, don't update the active question
// //       // You can show some indication to the user that the question is unanswered
// //       // For example, display a message, change the background color, etc.
// //     }
// //   };

// //   const submitPaper = () => {
// //     setUserAnswers((prevAnswers) => [
// //       ...prevAnswers,
// //       {
// //         questionId: AllQuestions?.[singleQuestion]?._id,
// //         userAnswer: selectedOption,
// //       },
// //     ]);
// //     let userAns = {
// //       paperId: paperId,
// //       answers: userAnswers,
// //     };
// //     dispatch(userSubmitPaper(userAns));
// //   };

// //   return (
// //     <>
// //       <div className="container">
// //         <div className="row">
// //           <div className="exam_ques_section col-md-6">
// //             <div className="exam_ques">
// //               <span className="remaining_time">
// //                 Remaining Time:{" "}
// //                 <h4 style={{ color: "red" }}>
// //                   {formatTime(remainingTime / 1000)}
// //                 </h4>
// //               </span>
// //               <span className="paper_name">{paperReducer?.paperId?.name}</span>

// //               <span>
// //                 <h2>{AllQuestions[singleQuestion]?.question}</h2>
// //               </span>
// //               <div className="answer_section">
// //                 {AllQuestions?.[singleQuestion]?.options.map((ele, i) => (
// //                   <div className="chk_box" key={ele._id}>
// //                     <span
// //                       style={{ cursor: "pointer" }}
// //                       onClick={() => setSelectedOption(ele.value)}
// //                     >
// //                       <input
// //                         type="radio"
// //                         name="answers"
// //                         checked={selectedOption === ele?.value}
// //                       />
// //                       <span style={{ marginLeft: "10px" }}>{ele.value}</span>
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //               <div className="button_group">
// //                 <button className="btn_style" onClick={() => previous()}>
// //                   Prev
// //                 </button>
// //                 <button className="btn_style" onClick={() => next()}>
// //                   Next
// //                 </button>
// //                 <button className="btn_style" onClick={submitPaper}>
// //                   Finish
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="monu col-md-6">
// //             <div className="rightquition container">
// //               <div className="row box">
// //                 {AllQuestions.map((question, index) => (
// //                   <div
// //                     key={index}
// //                     className={`small-box col-md-2 ${
// //                       userAnswers.some((ans) => ans.questionId === question._id)
// //                         ? "answered"
// //                         : ""
// //                     } ${singleQuestion === index ? "active" : ""}`}
// //                     onClick={() => handleQuestionClick(index)}
// //                   >
// //                     {index + 1}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };
// export default Exam;
