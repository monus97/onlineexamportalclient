import { useSelector } from "react-redux";

const ShowUserResult = () => {
  const { paperReducer } = useSelector((state) => state);

  return (
    <div className="exam_ques_section">
      <h1>Your Result</h1>
      <p style={{ fontSize: "20px" }}>
        Student Name:
        <span style={{ color: "green", fontSize: "22px" }}>
          {paperReducer?.result?.data?.userId?.name}
        </span>
      </p>
      <p style={{ fontSize: "20px" }}>
        Skill:
        <span style={{ color: "green", fontSize: "22px" }}>
          {paperReducer?.result?.data?.skillId?.skillName}
        </span>
      </p>
      {/* <p style={{ fontSize: "20px" }}>
        Total Questions:
        <span style={{ color: "green", fontSize: "22px" }}>
          {paperReducer?.result?.data?.paperId?.totalQuestion}
        </span>
      </p> */}
      <p style={{ fontSize: "20px" }}>
        your mark is :
        <span style={{ color: "green", fontSize: "22px" }}>
          {paperReducer?.result?.data?.score}
          {/* {paperReducer?.result?.data?.paperId?.totalQuestion} */}
        </span>
      </p>
      <h2>Answers:</h2>
      {paperReducer?.result?.data?.answers?.map((e, index) => (
        <div key={index}>
          <p style={{ fontSize: "26px" }}>
            Question:{index + 1} {e?.question?.question}
          </p>
          <span style={{ color: "black" }}>
            Correct Option is :
            <span style={{ color: "green", fontSize: "20px" }}>
              {e?.question?.correctOption}
            </span>
          </span>
          <p style={{ color: "black" }}>
            you Answered :
            {e?.question?.correctOption === e?.userAnswer ? (
              <span style={{ color: "green", fontSize: "20px" }}>
                {e?.userAnswer}
              </span>
            ) : (
              <span style={{ color: "red", fontSize: "20px" }}>
                {e?.userAnswer}
              </span>
            )}
          </p>
          {/* <p style={{ color: "green" }}>you Answered : {e.userAnswer}</p> */}
        </div>
      ))}
    </div>
  );
};

export default ShowUserResult;
