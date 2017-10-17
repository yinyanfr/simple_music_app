import React, {Component} from 'react';
import i18n from 'i18n';
import {SHA256} from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.css';
import {isEmail} from 'validator';
import {
  Button,
  From,
  Label,
  Input,
  FormGroup,
  FormText
} from 'reactstrap';

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.state = {
      tmp: ""
    }
  }
  loginSubmit(e){
    e.preventDefault();
    let check = e.target.elements.check.checked;
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    this.setState(() => {
      return {
          tmp: (() => {
            if(check){
              if(isEmail(email) && password.length){
                return `Good boy, your email is ${email}, your password is ${SHA256(password)}`
              }else{
                return 'email or password invalid'
              }
            }else{
              return "you have to agree the user agreement."
            }
          })()
        }
    })
  }
  render(){
    return (
      <div>
        <form onSubmit={this.loginSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Your Password" />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="check" />{' '}
              Lu et approuvé
            </Label>
          </FormGroup>
          <Button>Submit</Button>
        </form>
        <div>{this.state.tmp}</div>
      </div>
    )
  }
}

class Login extends Component{
  render(){
    return (
      <div>
        <LoginForm />
      </div>
    )
  }
}

export default Login;
