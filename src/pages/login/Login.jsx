import "../../styles/styles.css";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import * as APINetwork from "../../utils/network";
import logo from "../../assets/images/login_logo.svg";
import metamask from "../../assets/images/metamask.svg";

export default function Login() {

  async function requestAccount() {
    var Web3 = require('web3');

    var web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
    // web3.eth.getAccounts().then(console.log);

    // check if metamask exists
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        let response = await APINetwork.initiateLogin(accounts[0]);
        if (response.message) {
          // console.log(response.message);
          // it is supposed to be web3.eth.personal.sign 
          // it was written as web3.eth.sign below
          web3.eth.personal.sign(response.message, accounts[0], '', async (err, result) => {
            if (err) {
              console.log(err);
              alert("Error signing message");
            } else {
              let loginResponse = await APINetwork.login(accounts[0], result);
              // console.log(loginResponse);
              // contains token and user info. Add to local storage and continue login process to dashboard here
              localStorage.setItem('token', loginResponse.token);
              localStorage.setItem('user', JSON.stringify(loginResponse.user));

              nav("/dashboard");
            }
          });
        }

      } catch (err) {
        console.log("Error connecting to Metamask " + err);
      }
    } else {
      return "failure";
    }
  }

  const nav = useNavigate();

  async function handleClick() {
    let res = await requestAccount();
    if (res === "success") {
      nav("/dashboard");
    }
  }

  return (
    <div class="top-half">
      <Card variant="outlined" class="card">
        <div class="logo">
          <img src={logo} alt="Where's my logo" />
        </div>
        <div class="login-form">
          <h1>Sign In</h1>
          <h5>Welcome back, we missed you!</h5>

          <Button
            variant="contained"
            disableElevation
            style={{ width: "70%" }}
            onClick={handleClick}
          >
            <img src={metamask} alt="metamask logo" />
            Sign In with Metamask
          </Button>

          {/* <div class="login-footer">
            <p>
              Don't have an account? <a href="/register">Sign Up</a>
            </p>
          </div> */}
        </div>
      </Card>
    </div>
  );
}

