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
              }else if(!isEmail(email)){
                return 'email invalid'
              }else{
                return 'password required'
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
            <Label for="email">Email</Label>
            <Input type="email" name="email" placeholder="Your Email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" placeholder="Your Password" />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="check" />{' '}
              En vous connectant, vous acceptez nos Conditions d’utilisation et notre Politique de confidentialité.
            </Label>
          </FormGroup>
          <Button>Submit</Button>
        </form>
        <div>{this.state.tmp}</div>
      </div>
    )
  }
}

class RegisterForm extends Component{
  constructor(props){
    super(props);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.state = {
      tmp: ""
    }
  }
  uidValid(uid){
    return /^[A-Za-z0-9_]{6,}$/.test(uid)
  }
  passwordValid(password){
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
  }
  registerSubmit(e){
    e.preventDefault();
    let check = e.target.elements.check.checked;
    let uid = e.target.elements.uid.value;
    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    let password2 = e.target.elements.password2.value;
    this.setState(() => {
      return {
          tmp: (() => {
            if(check){
              if(this.uidValid(uid) && isEmail(email) && this.passwordValid(password) &&password.length && password === password2){
                return `Good boy, your email is ${email}, your password is ${SHA256(password)}`
              }else if (!this.uidValid(uid)) {
                return 'uid invalid'
              }
              else if(!isEmail(email)){
                return 'email invalid'
              }else if(password !== password2){
                return `password doesn't match`
              }else if(!this.passwordValid){
                return "your password should contain at least 1 number 1 Maj 1 min"
              }
              else{
                return 'password required'
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
        <form onSubmit={this.registerSubmit}>
        <FormGroup>
          <Label for="uid">{"ID"}</Label>
          <Input type="text" name="uid" placeholder="Your ID(at least 6 letters/numbers/_)" />
        </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" placeholder="Your Email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" placeholder="Your Password" />
          </FormGroup>
          <FormGroup>
            <Label for="password2">Confirm Password</Label>
            <Input type="password" name="password2" placeholder="Your Password Again" />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="check" />{' '}
              En vous inscrivant, vous acceptez nos Conditions d’utilisation et notre Politique de confidentialité.
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
        <RegisterForm />
      </div>
    )
  }
}

export default Login;
