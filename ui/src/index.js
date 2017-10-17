import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import validator from 'validator';
import './style.css';
import Header from './header';
import Body from './body';
import Footer from './footer';


class Zikub extends React.Component{
  render(){
    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<Zikub />, document.getElementById('root'));
registerServiceWorker();
