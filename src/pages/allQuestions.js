import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allQuestion,
  createNewQuestionPaper,
  deleteQuestionById,
} from "../redux/actions/authActions";
import { errorAlert, successAlert } from "../utils/swal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const AllQuestions = () => {
  const [questionId, setQuestionId] = useState();
  const [allQuestionId, setAllQuestionId] = useState([]);
  const [paperName, setPaperName] = useState("");
  const [createdPaper, setCreatedPaper] = useState(false);
  // console.log(allQuestionId, paperName, "questionId");
  const { paperReducer } = useSelector((state) => state);
  const result = paperReducer.allQuestion.allQuestion;
  console.log(questionId, "AllQuestions,questionId");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    createPaper();
  }, [questionId]);

  const createPaper = () => {
    if (questionId === undefined) {
      return;
    }
    const isQuestionIdSelected = allQuestionId.includes(questionId);

    if (isQuestionIdSelected) {
      setAllQuestionId(allQuestionId.filter((id) => id !== questionId));
    } else {
      setAllQuestionId((previousIds) => [...previousIds, questionId]);
    }
  };
  const createQuestionPaper = () => {
    setCreatedPaper(true);
    let obj = {
      name: paperName,
      questions: allQuestionId,
    };
    dispatch(createNewQuestionPaper(obj));
    // console.log("obj", obj);
  };

  useEffect(() => {
    if (createdPaper === true) {
      successAlert("new paper for exam has been created");
      navigate("/showpaper");
    }
  }, [createQuestionPaper]);

    async function deleteOperation(id) {
      console.log(id,"id")
      Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        cancelButtonColor: "#ff0000",
        confirmButtonColor: "#00b300",
        confirmButtonText: "Yes, please delete",
        cancelButtonText: "No, cancel",
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            dispatch(deleteQuestionById(id));
            dispatch(allQuestion());
          }
        })
        .catch((err) => {
          errorAlert("something went wrong!");
        });
    }

  return (
    <>
      <div className="exam_ques_section">
        <div className="exam_ques">
          <h1>Create Question Paper</h1>
          <div className="quiz_paper_name">
            <label>Paper Name : </label>
            <input
              type="text"
              placeholder="Enter Paper Name here"
              onChange={(e) => setPaperName(e.target.value)}
            />
          </div>
          <div>
            <h2> Question List</h2>
            <ul style={{listStyle:"none"}}>
              <h3>
                <span style={{ color: "blue" }}>
                  Note :
                  <span style={{ color: "white" }}>
                    select questions for your question paper please click in
                    checkbox
                  </span>
                </span>
              </h3>

              {result?.map((question, i) => (
                <li key={question._id}>
                  <p>
                    <h4>
                      Ques.no.{i + 1}
                      {question.question}
                      <input
                        style={{ cursor: "pointer" ,width:"90px",height:"18px"}}
                        type="checkbox"
                        onClick={() => setQuestionId(question._id)}
                      />
                      &nbsp;&nbsp;
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                        color="red"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteOperation(question._id)}
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </h4>
                  </p>
                  <ul>
                    {question.options?.map((option) => (
                      <li key={option._id}>
                        <label>
                          <span name={question._id} value={option.value} />
                          {option.value}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <h5>
                    <span>correct Answer is :</span>
                    <span style={{ color: "green", fontSize: "22px" }}>
                      {question.correctOption}
                    </span>
                  </h5>
                </li>
              ))}
            </ul>
            <button className="btn_style" onClick={createQuestionPaper}>
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllQuestions;
