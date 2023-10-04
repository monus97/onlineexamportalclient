import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorAlert } from "../../src/utils/swal";
import { getQuestionsBySkill } from "../redux/actions/skillActions";
const UserDetails = () => {
  const [status, setStatus] = useState(false);
  const [response, setResponse] = useState(false);
const {skillReducer} = useSelector((state)=>state)
const { skillId } = skillReducer;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
dispatch(getQuestionsBySkill(skillId));
    if (status === true) {
      if (response === true) {
        navigate("/exampaper");
      }
    }
  }, [status, response]);
  const startPaper = () => {
    setResponse(true);
  };

  const name = JSON.parse(localStorage.getItem("name"));
  return (
    <div>
      <div className="container">
        <div style={{ fontWeight: "bold", padding: "20px 0px" }}>
          Welcome mr {name}
        </div>
        <div className="">
          Note :
          <span className="description">
            1. this is for testing examination.
          </span>
          <span className="description">
            2. you have only 30 minutes for submitting your answers if you are
            not submit your response on the given time the response is auto
            submit.
          </span>
          <span className="description">
            3. it has 10 questions each questions have four options , select
            right answer and click on next button.
          </span>
          <span className="description">
            4. if you want to see your previous answers click previous
            button,and see your response{" "}
          </span>
          <span className="description">
            5. if you read the descriptoion with carefully please check the box,
            and click the start button
          </span>
          <span className="description">
            6. please note after start the paper do not refresh the page
          </span>
          <span className="description">have a good day!</span>
          <span className="check_box">
            <input
              type="checkbox"
              onClick={() => setStatus(true)}
              style={{ width: "15px", margin: "18px" }}
            />
            <p style={{ margin: "10px" }}>
              I agree with all above terms & conditions?
            </p>
          </span>
          <button className="submit__btn" onClick={() => startPaper()}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
