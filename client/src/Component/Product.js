import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import PropTypes from 'prop-types';

export default class Product extends Component {
    render() {
        const {id, title, img, price, inCart} = this.props.product;
        return(
            <ProductWrapper className="col-7 mx-auto col-md-3 col-lg-3 my-3">
                <div className="card">
                    <ProductConsumer>
                        {value => (
                        <div 
                            className="img-container p-5" 
                            onClick={() => value.handleDetail(id)}
                        >
                        <Link to="/details">
                             <img src={img} alt="product" 
                            className="card-img-top" />
                        </Link>
                        <button 
                            className="cart-btn"
                            disabled={inCart ? true : false} 
                            onClick={()=>{
                                value.addToCart(id);
                                value.openModal(id);
                            }}
                        >
                            {inCart ? (
                                <p className="text-capitalize mb-0" disabled>
                                    {" "}
                                    Dans le panier
                                </p>
                            ) : (
                                <i className="fas fa-cart-plus"/>
                            )}

                        </button>
                        </div>)}
                        
                    </ProductConsumer>
                    {/* card footer */}
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">
                            {title}
                        </p>
                        <h5 className="text-dark font-italic mb-0">
                            {price}
                            <span className="mr-1">€</span>  
                        </h5>
                    </div>
                </div>
            </ProductWrapper>
        );
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
};

const ProductWrapper = styled.div`
    .card {
        border-color:transparent;
        transition: all 1s linear;
    }
    .card-footer {
        background: transparent;
        border-top: transparent; 
        transition: all 1s linear;
    }
    &:hover{
        .card{
            border:0.04rem solid rgba(0,0,0,0.2);
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
        }
        .card-footer {
            background: var(--WHITESALMON);
        }
    }
    .img-container {
        position: relative;
        overflow: hidden;
    
    }
    .card-img-top{
        transition: all 1s linear;
    }
    .img-container: hover .card-img-top{
        transform : scale(1.3);
    }
    .cart-btn {
        position: absolute;
        bottom: 2.2em;
        right: 0;
        padding: 0.2rem 0.4rem;
        background: var(--mainWhite);
        border: none;
        color: var(--tan);
        font-size:1.4rem;
        border-radius:0.5rem 0 0 0;
        transition: all 1s linear;
    }
    .img-container:hover .cart-btn{
        transform: translate(0, 0);
    }
    .cart-btn: hover {
        color: var(--DARKSALMON);
        cursor: pointer;
    }
`;