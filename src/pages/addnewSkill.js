import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { generateSkill, getSkills } from "../redux/actions/skillActions";
import { successAlert } from "../utils/swal";

const AddNewSkill = ()=>{
    const [newSkill, setNewSkill] = useState("");
    const [status, setStatus] = useState(false);
    const { authReducer } = useSelector((state) => state);
    const dispatch = useDispatch()
    useEffect(() => {
      if (status === true) {
        successAlert("success", "new skillCreated");
        dispatch(getSkills());
      }
    }, [authReducer.token, status === true]);
    const createSkill = () => {
      dispatch(generateSkill({ skillName: newSkill }));
      dispatch(getSkills());
      setStatus(true);
    };
return (
  <>
    <div className="container">
        
      <input
        placeholder="create new skill"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
      />
    </div>
  </>
);
}
export default AddNewSkill;