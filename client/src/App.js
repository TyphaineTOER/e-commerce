import React, { Component } from 'react';
import './App.css';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Menu from './Component/Menu';
import { Route, Switch } from 'react-router-dom';
import ProductList from './Component/ProductList';
import Cart from './Component/Cart';
import Details from './Component/Details';
import Modal from './Component/Modal';
import  'bootstrap/dist/css/bootstrap.min.css';




import Article from './Article'
import Users from './Users'
import RegisterForm from './RegisterForm';
import LoginForm from './Login';




class App extends Component {
  
  render() {
    return (
      <div className="App">
  
            <React.Fragment>
              <Navbar />
              <Menu />
                <Switch>
                      <Route path="/Details" component={Details} />
                      <Route path="/Cart" component={Cart} />
                      <Route path="/" exact component={ProductList} />
                      <Route path="/users" component={Users} />
                      <Route path="/register" component={RegisterForm} />
                      <Route path="/login" component={LoginForm} />
                      <Route path="/articles" component={Article} />
                
              </Switch>
              <Modal />
              <Footer />
            </React.Fragment>
      
          
          <main style={{marginTop: '64px'}}>

          </main>
          
      </div>
      
    );
  }
}

export default App;
