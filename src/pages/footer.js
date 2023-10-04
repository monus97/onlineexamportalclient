import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const navi = ()=>{
navigate('/')
  }
  return (
    <div className="footer">
      <div className="footer_div">
        <span>
          <img
            style={{ width: "200px", margin: "10px" }}
            src={require("../assets/img/yuva-logo (1).png")}
            alt="logo"
          />
        </span>
      </div>
      <div className="footer_div">
        <span className="bt_rt" onClick={() => navi()}>
          home
        </span>
        <span className="bt_rt">services</span>
        <span className="bt_rt" onClick={()=>navigate("/about")}>
          about
        </span>
        <span className="bt_rt">galary</span>
        <span className="bt_rt">contact</span>
      </div>
      <div className="footer_div">
        <span className="bt_rt">
          © 2021 Yuvasoft Solutions Pvt. Ltd. | All Rights Reserved
        </span>
      </div>
      <div className="footer_div">
        <span className="ft_rt">
          <i class="fa fa-phone"></i>
        </span>
        <span className="ft_rt">
          <i class="fa fa-facebook"></i>
        </span>
        <span className="ft_rt">
          <i class="fa fa-instagram"></i>
        </span>
        <span className="ft_rt">
          <i class="fa fa-twitter"></i>
        </span>
      </div>
    </div>
  );
};
export default Footer;
