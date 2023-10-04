import { useSelector } from "react-redux";

const AllResults = () => {
  const { allResult } = useSelector((state) => state.paperReducer);
  const res = useSelector((state) => state);
  console.log(res, "from AllResults");
  return (
    <>
      <div className="container" style={{marginTop: "16px"}}>
        <div className="exam_ques_section">
          {allResult?.data?.map((e, i) => (
            <div key={e._id} style={{ marginBottom: "20px" }}>
              <h3>
                {i + 1}. Candidate Name : {e.userId.name}
              </h3>
              <strong>
                {" "}
                <p>Exam Name: {e.skillId.skillName}</p>
              </strong>

              {/* <strong>
            <p>Total Questions: {e.paperId.totalQuestion}</p>
          </strong> */}

              <p>
                <strong>Scored: {e.score}</strong>
              </p>
              <h4>Answers:</h4>
              <ul>
                {e?.answers
                  ?.filter((ele) => {
                    if (ele.question !== null) {
                      return ele;
                    }
                  })
                  .map((ele, index) => (
                    <li key={index + 1} className="question">
                      <span style={{ fontWeight: "bold" }}>
                        Question:{index + 1} {ele.question.question || null}
                      </span>
                      <br />
                      Correct Option: {ele.question.correctOption || null}
                      <br />
                      User Answer: {ele.userAnswer || null}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllResults;
