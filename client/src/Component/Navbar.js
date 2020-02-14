import React, {Component} from 'react';
import './Navbar.css'; 

class navbar extends Component{

  constructor() {
    super();

    this.state ={
      user: [],
      inscription:'Inscription',
      connexion:'Connexion',
      logout: ''
    }
  }

  componentDidMount()
  {
      const Token = localStorage.getItem('user')
      if(Token){
        this.setState({ user: JSON.parse(Token)});
        this.setState({connexion: ''});
        this.setState({inscription: ''});
        this.setState({logout: 'logout'})
      }
    }

    logout()
    {
      localStorage.clear();
    }
   

  render() {
    return(
      <header className="Navbar">
          <nav className="Navbar_navigation">
            <div></div>
            <div className="navbar_logo"><a href="/">CAMTSHOP</a></div>
            <div className="spacer_form" />

                  <form className="form-inline my-2 my-lg-0">
                          <input className="form-control mr-sm-2" type="search" placeholder="" aria-label="Search" />
                          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Recherche</button>

                  </form>
            <div className="spacer" />
            <div className="navbar_navigation-items">
              <ul>
                <li>{this.state.user['mail']}</li>
                <li><a href="/register">{this.state.inscription}</a></li>
                <li><a href="/login">{this.state.connexion}</a></li>
                <li onClick={this.logout}>{this.state.logout}</li>

              </ul>
            </div>
            <div className="cart_navigation">
                    
                  <span className="mr-2">
                  <a href="/cart"><i  className="fas fa-cart-plus" /></a>
                  </span>
            
            </div>
          </nav>
        </header>
    );
  }

}

export default navbar;
