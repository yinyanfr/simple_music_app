import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import validator from 'validator';
import Login from './login';


class Zikub extends React.Component{
  render(){
    return (
      <div>
        <Login />
      </div>
    )
  }
}

ReactDOM.render(<Zikub />, document.getElementById('root'));
registerServiceWorker();
