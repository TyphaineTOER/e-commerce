import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link }from 'react-router-dom';
import "./Component/Home.css";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import ProductList from './Component/ProductList';

class Home extends Component { 
    constructor(){
        super();
        this.state ={}
      }
      render() {
        return (
            <div className="container">
              <div>
                <Route exact path='/Navbar' component={Navbar}/>
              </div>

              <div>
                <Route exact path='/' component={ProductList}/>
              </div>

                
                <Route exact path='/Footer' component={Footer}/>
                </div>
            
         
        );
      }
}
export default Home;
