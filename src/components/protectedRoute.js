import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Protected(props) {
  let Protecting = props.Protecting;
  const navigate = useNavigate();
  useEffect(() => {
    let userData = localStorage.getItem("user_Token")
    
    if (!userData) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Protecting />
    </div>
  );
}
export default Protected;
