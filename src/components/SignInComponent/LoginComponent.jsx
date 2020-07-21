import React, { Component } from "react";
import "./LoginComponent.scss";
import ProfileComponent from "./ProfileComponent";
import Axios from 'axios';
import SignInFormComponent from "./SignInFormComponent";
import { withRouter } from 'react-router-dom';

class LoginComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      userEmailId: "",
      userPassword: ""
    };
  }

  onEmailChange = e => {
    this.setState({ userEmailId: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ userPassword: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log("Password length" + this.state.userPassword);
    if (this.state.userPassword.length < 5) {
      alert("Password should be of at least 5 characters");
    } else { 
      this.loginApi();
      
    }
  };

  loginApi = (e) => {
    Axios.post('/login', {
      email: this.state.userEmailId,
      password: this.state.userPassword
    })
    .then(res => {
      console.log(res)
         if(res.data === true)
         {
          this.props.userLoggedIn("true");
          this.props.history.push(`/`);
          //this.props.history.push(`/confirmOrder/${this.state.param2}/${this.state.param1}/${this.state.param3}/${this.state.userEmailId}`)
         }
         else
         {
           alert("Invalid User")
         }
    })
    .catch(err => {
        console.log(err);
    })
}

onForgotPassword = e => {
  console.log("iNSIDE fORGOR password 1")
  this.logoutApi();
};

logoutApi = (e) => {
  console.log("iNSIDE fORGOR password 2")
  Axios.post('/forgotpassward', {})
  .then(res => {
    console.log(res)
       if(res.data === true)
       {
        this.props.userLoggedIn("true");
        this.props.history.push(`/`);
        //this.props.history.push(`/confirmOrder/${this.state.param2}/${this.state.param1}/${this.state.param3}/${this.state.userEmailId}`)
       }
       else
       {
         alert("Invalid User")
         this.props.history.push(`/`);
       }
  })
  .catch(err => {
      console.log(err);
  })
}

  render() {
    const { userEmailId } = this.state;
    console.log("Email: " + userEmailId);
    return (
      <div style={{margin:"80px auto"}}>
        <div className="row mb-4">
          <div className="login col-lg-4" style={{ "padding-right": "40px" }}>
            <div className="card mr-1 mt-5 bg-dark  ">
              <div className="card-body bg-dark">
                <SignInFormComponent
                  onFormSubmit={this.onFormSubmit}
                  onEmailChange={this.onEmailChange}
                  onPasswordChange={this.onPasswordChange}
                  onForgotPassword = {this.onForgotPassword}
                  {...this.state}
                ></SignInFormComponent>
              </div>
            </div>
          </div>
        </div>
        <br></br><br></br><br></br><br></br><br></br>
      </div>
    );
  }
}

export default withRouter(LoginComponent);
