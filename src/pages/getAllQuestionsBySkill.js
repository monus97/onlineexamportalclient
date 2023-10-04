import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteQuestionById } from "../redux/actions/authActions";
import { getQuestionsBySkill } from "../redux/actions/skillActions";
import { errorAlert } from "../utils/swal";

const GetAllQuestionBySkill = () => {
  const { skillReducer } = useSelector((state) => state);
  const [status, setStatus] = useState(false);
  const { skillId } = skillReducer;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function deleteOperation(id) {
    console.log(id, "id");
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
          dispatch(getQuestionsBySkill(skillId));
        }
      })
      .catch((err) => {
        errorAlert("something went wrong!");
      });
  }

  useEffect(() => {
    if (status === true) {
      abc();
    }
  }, [status]);
  const abc = () => {
    navigate("/add");
  };
  const role = JSON.parse(localStorage.getItem("role"));
  return (
    <div>
      {role === "admin" ? (
        <>
          <div className="container">
            <div className="center_wr">
              <div className="skill_header">
                <span className="des_content">
                  To Add More Question In This Question Paper Click The Add
                  Button
                </span>
                <Button
                  onClick={() => setStatus(true)}
                  className="Add_Quez add_skill"
                >
                  + Add Questions
                </Button>
              </div>
              <div>
                {skillReducer?.skilledQuestions?.allQuestions?.map(
                  (ele, index) => (
                    <div key={index}>
                      <h4>
                        Question {index + 1}: {ele?.question}{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                          color="red"
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteOperation(ele._id)}
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                      </h4>
                      <p>
                        Skill Type:{" "}
                        <span style={{ fontWeight: "bold", color: "blue" }}>
                          {ele?.skillType?.skillName}
                        </span>
                      </p>

                      <ul>
                        <span style={{ fontWeight: "bold" }}>Options:</span>
                        {ele?.options?.map((e, Index) => (
                          <li key={Index}>{e?.value}</li>
                        ))}
                      </ul>
                      <p>
                        Correct Option:{" "}
                        <span style={{ fontWeight: "bold", color: "green" }}>
                          {ele?.correctOption}
                        </span>
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>{navigate("/userdetails")}</>
      )}
    </div>
  );
};

export default GetAllQuestionBySkill;
