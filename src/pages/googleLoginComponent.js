import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleSignUp } from "../redux/actions/authActions";

const GoogleLoginComponent = ({ onGoogleSignIn }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          setStatus(true);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  useEffect(() => {
    if (status === true) {
      dispatch(
        googleSignUp({
          name: profile?.name,
          email: profile?.email,
          googleId: profile?.id,
        })
      );
      onGoogleSignIn();
    }
  }, [status]);
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <>
      <div>
        {profile ? (
          <></>
        ) : (
          <button className="g_btn" onClick={() => login()}>
            Sign in with Google{" "}
          </button>
        )}
      </div>
    </>
  );
};

export default GoogleLoginComponent;
