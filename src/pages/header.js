import { Nav } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear("user_Token", "role", "name");
    navigate("/");
  };

  const userToken = localStorage.getItem("user_Token") || "";
  const isAdmin = localStorage.getItem("role") || "";

  // console.log(isAdmin,"roleeeeeeeee")
  return (
    <>
      <div className="top_header">
        <span>
          <img
            style={{ width: "200px", margin: "10px" }}
            src={require("../assets/img/yuva-logo (1).png")}
            alt="logo"
          />
        </span>
        <div className="top_header_left">
          <span className="tp_rt">
            <i class="fa fa-search" style={{ color: "#2b462b" }}></i>
          </span>
          <span className="tp_rt">
            <i class="fa fa-facebook" style={{ color: "#0296d3" }}></i>
          </span>
          <span className="tp_rt">
            <i class="fa fa-instagram" style={{ color: "red" }}></i>
          </span>
        </div>
      </div>
      <div className="header">
        {userToken ? (
          <Nav>
            {isAdmin === "admin" ? (
              <>
                {/* <Nav.Item>
                <Nav.Link as={Link} to="/allquestion">
                  All Question
                </Nav.Link>
              </Nav.Item> */}
                {/* <Nav.Item>
                <Nav.Link as={Link} to="/add">
                  Create Questions
                </Nav.Link>
              </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link as={Link} to="/allresults">
                    All Results
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                <Nav.Link as={Link} to="/showpaper">
                  Paper Details
                </Nav.Link>
              </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link onClick={logOut}>logOut</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/skill">
                    Skill
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link onClick={logOut}>Logout</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link as={Link} to="/skill">
                    Skill
                  </Nav.Link>
                </Nav.Item> */}
              </>
            )}
          </Nav>
        ) : (
          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </div>
    </>
  );
};

export default Header;

// const Header = () => {
//   const navigate = useNavigate();
//   const { authReducer } = useSelector((state) => state);
// const { role } = authReducer.loginData.userDetails;
// console.log(role,"role")
//   const logOut = () => {
//     localStorage.removeItem("user_Token");
//     navigate("/");
//   };
//   return (
//     <div className="header">
//       {localStorage.getItem("user_Token") ? (
//         {
//           role === "admin" ? ( <Nav variant="tabs">
//  <Nav.Item>
//             <Nav.Link as={Link} to="/allquestion" className="nav_link">
//               All Question
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link as={Link} to="/allresults" className="nav_link">
//               All Results
//             </Nav.Link>
//           </Nav.Item>
//           </Nav>):(
//             <Nav variant="tabs">
// <Nav.Item>
//             <Nav.Link as={Link} to="/exam" className="nav_link">
//               Exam Paper
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link className="nav_link" onClick={logOut}>
//               logOut
//             </Nav.Link>
//           </Nav.Item>

//           <Nav.Item>
//             <Nav.Link as={Link} to="/showpaper" className="nav_link">
//               Paper Details
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link as={Link} to="/showresult" className="nav_link">
//               Show Result
//             </Nav.Link>
//           </Nav.Item>
//             </Nav>
//           )
//           }
//       ) : (
//         <Nav variant="tabs">
//           <Nav.Item>
//             <Nav.Link as={Link} to="/" className="nav_link">
//               Home
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link as={Link} to="/register" className="nav_link">
//               Register
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link as={Link} to="/login" className="nav_link">
//               Login
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//       )}
//     </div>
//   );
// };

// export default Header;
