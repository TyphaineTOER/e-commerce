import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterContainer className="main-footer">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
          
        
           <div className="col-md-3 col-sm-6">
              <h4>MENTIONS LEGALE</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Politique de Confidentialité</a>
                </li>
                <li>
                  <a href="#">Mentions legale</a>
                </li>
                <li>
                  <a href="#">Condition general de vente</a>
                </li>
              </ul>
            </div>
         
            <div className="col-md-3 col-sm-6">
              <h4>SERVICE CLIENTS</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Aide et Contact</a>
                </li>
                <li>
                  <a href="#">Livraison et retours</a>
                </li>
                <li>
                  <a href="#">Avis des clients</a>
                </li>
              </ul>
            </div>
         
            <div className="col-md-3 col-sm-6">
              <h4>METHODES DE PAYEMENT</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Visa</a>
                </li>
                <li>
                  <a href="#">Paypal</a>
                </li>
                <li>
                  <a href="#">Payement securiser</a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6">
              <h4>Ou nous trouver</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.google.com/maps/place/Web@cademie/@48.8155478,2.3607954,17z/data=!3m1!4b1!4m5!3m4!1s0x47e673b314d5fd1f:0xe950a69de85a2c75!8m2!3d48.8155478!4d2.3629841">24 rue pasteur,
                              Kremlin bicetre Web@cademie by Epitech </a>
                 </li>
              
              </ul>
            </div>

            <div className="Creation">
               <p>CREATIONS: Camy MARTA, Aurelien VEAU, Maxime DEFONTAINE, Typhaine TOER, Steeven GUILLO</p>
              
            </div>

          
           
          </div>
          </div>
        </div>
      
    </FooterContainer>
  );
}
export default Footer;

const FooterContainer = styled.footer`
  .footer-middle {
    background: var(--TAN);
    padding-top: 3rem;
    color: var(--mainDark);
  }
  .
  .footer-bottom {
    padding-top: 3rem;
    padding-bottom: 0;
    align-content: center;
  }
  ul li a {
    color: var(--mainLight);
  }
  ul li a:hover {
    color: var(--mainLightGrey);
  }
  
  .Creation{
    text-align:center;
  }
  .main-footer {
    margin-bottom: 0
  }
  
`;

