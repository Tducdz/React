import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    let res = await postLogin(email, password);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/");
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have account yet?</span>
        <button>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">TDucQuiz</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Login
          </button>
          <div className="btn-home">
            <span onClick={() => navigate("/")}>
              {" "}
              &#60;&#60; Return to Homepage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
