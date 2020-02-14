import React, {Component} from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from '../context';

export default class ProductList extends Component {
    constructor(){
        super();
        this.state= {
            user: []
        }
    }
    render() {
        return(
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="Bienvenue sur" title="CAMTSH0P" />
                        <div>
                            {this.state.user}
                        </div>
                        
                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    return value.products.map( product =>{
                                        return <Product key={product.id} product={product} />;
                                    })
                                }}
    
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            // <Product />
        );   
    }
}