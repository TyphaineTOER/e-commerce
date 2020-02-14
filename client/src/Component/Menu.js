import React, {Component} from 'react';
import styled from 'styled-components';
import App from '../App';
import './Menu.css';


class Menu extends Component { 
  
    render() {
      return ( 

        <section className="bloc">
  <nav>
    <ul className="navigation">
      <li>
        <a href="#">Nouveauté</a>
       
        <ul>
          <li><a href="#">Pull</a></li>
          <li><a href="#">tee-shirt</a></li>
          <li><a href="#">Jeans</a></li>
          <li><a href="#">Jogging</a></li>
          <li><a href="#">Chaussures</a></li>
        </ul>
      </li>
      <li>
        <a href="#">Vetements</a>
       
        <ul>
          <li><a href="#">Pull</a></li>
          <li><a href="#">Sweet</a></li>
          <li><a href="#">Tee-shirt</a></li>
          <li><a href="#">jeans</a></li>
          <li><a href="#">jogging</a></li>
          
        </ul>
      </li>
      <li>
        <a href="#">Chaussures</a>
       
        <ul>
          <li><a href="#">Basket</a></li>
          <li><a href="#">Bottes</a></li>
          <li><a href="#">Tongs compensés</a></li>
          <li><a href="#">Chaussure de ville</a></li>
        </ul>
      </li>
      <li>
        <a href="#">Promos</a>
       
        <ul>
          <li><a href="#">Pull</a></li>
          <li><a href="#">Tee-shirt</a></li>
          <li><a href="#">Jeans</a></li>
          <li><a href="#">Jogging</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</section>


      )

       }
    }

export default Menu