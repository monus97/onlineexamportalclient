import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  generateSkill,
  getQuestionsBySkill,
  getSkillID,
  getSkills,
} from "../redux/actions/skillActions";
import { errorAlert, successAlert } from "../utils/swal";

const Skill = () => {
  const [newSkill, setNewSkill] = useState("");
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const { authReducer } = useSelector((state) => state);
  const navigate = useNavigate();
  const { skillReducer } = useSelector((state) => state);
  console.log(skillReducer, "skillReducer from popup");
  const dispatch = useDispatch();

  const skillId = (id) => {
    dispatch(getQuestionsBySkill(id));
    navigate("/getallquestionbyskill");
    dispatch(getSkillID(id));
    console.log(id, "from skill");
  };
  useEffect(() => {
    if (status === true) {
      setStatus(false);
      successAlert("success", "new skillCreated");
      dispatch(getSkills());
      handleClose();
    }
    dispatch(getSkills());
  }, [authReducer.token, status]);
  const createSkill = () => {
    dispatch(generateSkill({ skillName: newSkill }));
    dispatch(getSkills());
    setStatus(true);
    setNewSkill("");
  };
  const role = JSON.parse(localStorage.getItem("role"));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {role === "admin" ? (
        <>
          <div className="container">
            <span className="new_skill">
              <Button className="add_skill" onClick={handleShow}>
                + New Skill
              </Button>
            </span>

            <Modal
              show={show}
              onHide={handleClose}
              // data-aos="fade-right"
              //     data-aos-offset="300"
              //     data-aos-easing="ease-in-sine"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add New Skill</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  className="skill_input"
                  placeholder="skills"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={() => createSkill()}>
                  Create
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="container">
              <div className="row parent ">
                {skillReducer?.skill?.data?.map((paper) => (
                  <div
                  // data-aos="fade-up"
                  data-aos-anchor-placement="center-center"
                    onClick={() => skillId(paper._id)}
                  >
                    <div className="parent2 box">{paper?.skillName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row parent ">
              {skillReducer?.skill?.data?.map((paper) => (
                <div
                  className="col-md-6"
                  // data-aos="zoom-in-right"
                  onClick={() => skillId(paper._id)}
                >
                  <div className="parent2 box">{paper?.skillName}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Skill;
