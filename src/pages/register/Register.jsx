import "../../styles/styles.css";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";

import logo from "../../assets/images/login_logo.svg";
import metamask from "../../assets/images/metamask.svg";

function Login() {
  return (
    <div class="top-half">
      <Card variant="outlined" class="card">
        <div class="logo">
          <img src={logo} alt="Where's my logo" />
        </div>
        <div class="login-form">
          <h1>Register</h1>
          <h5>Hey there, nice to meet you!</h5>

          <img src={metamask} alt="metamask logo" className="logo-register"/>
          <br />

          <Button variant="contained" disableElevation style={{ width: "70%" }}>
            <span className="register-label">Connect To Metamask</span>
          </Button>

          <div class="login-footer">
            <p>
                Already have an account? <a href="/">Sign In</a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Login;
