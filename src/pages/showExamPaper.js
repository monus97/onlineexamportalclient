import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showAllPapers, showPaperById } from "../redux/actions/authActions";

const ShowPaper = () => {
  const navigate = useNavigate();
  const { paperReducer } = useSelector((state) => state);

  const { authReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showAllPapers());
  }, [authReducer.token]);

  const role = JSON.parse(localStorage.getItem("role"));

  const gotofun = (id) => {
    dispatch(showPaperById(id));
    navigate("/userdetails");
  };

  return (
    <>
      <div className="container">
        <div className="row parent">
          {paperReducer.allPapers.map((paper) => (
            <div className="col-md-6" onClick={() => gotofun(paper._id)}>
              <div className="parent2">{paper?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowPaper;
