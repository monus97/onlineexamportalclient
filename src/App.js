import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/registerPage";
import Header from "./pages/header";
import Footer from "./pages/footer";
import Login from "./pages/login";
import Exam from "./pages/examPaper";
import Protected from "./components/protectedRoute";
import AddQuestionAndAnswer from "./pages/addQuestionAndAnswer";

import ShowPaper from "./pages/showExamPaper";
import UserDetails from "./pages/userDetails";
import ShowUserResult from "./pages/showUserResult";
import Home from "./pages/home";
import AllResults from "./pages/allResult";
import CheckResult from "./pages/checkResult";
import Skill from "./pages/skill";
import GetAllQuestionBySkill from "./pages/getAllQuestionsBySkill";
import AddNewSkill from "./pages/addnewSkill";

import ExamPaper from "./pages/newExamPaper";

import About from "./pages/about";

function App() {
  return (
    <div>
      {/* <GoogleLoginComponent/> */}
   
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/re" element={<SimpleSlider />} /> */}
          {/* <Route
            path="/allquestion"
            element={<Protected Protecting={AllQuestions} />}
          /> */}
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
          <Route path="/login" element={<Login />} />
          <Route path="/exam" element={<Protected Protecting={Exam} />} />
          <Route
            path="/exampaper"
            element={<Protected Protecting={ExamPaper} />}
          />
          <Route path="/skill" element={<Protected Protecting={Skill} />} />
          <Route
            path="/newskill"
            element={<Protected Protecting={AddNewSkill} />}
          />
          <Route
            path="/getallquestionbyskill"
            element={<Protected Protecting={GetAllQuestionBySkill} />}
          />
          <Route
            path="/userdetails"
            element={<Protected Protecting={UserDetails} />}
          />
          <Route
            path="/check"
            element={<Protected Protecting={CheckResult} />}
          />
          <Route
            path="/showresult"
            element={<Protected Protecting={ShowUserResult} />}
          />
          <Route
            path="/allresults"
            element={<Protected Protecting={AllResults} />}
          />
          <Route
            path="/showpaper"
            element={<Protected Protecting={ShowPaper} />}
          />
          <Route
            path="/add"
            element={<Protected Protecting={AddQuestionAndAnswer} />}
          />
        </Routes>
        <Footer />
      {/* <Test />
      <Main />
      {/* <Register /> */}
      {/* <Footer />  */}
    </div>
  );
}

export default App;
