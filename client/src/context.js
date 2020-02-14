import React, {Component} from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//provider
//Consumer

class ProductProvider extends Component {
    state={
        products: [],
        detailsProduct: detailProduct,
        cart:[],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        carTax: 0,
        cartTotal: 0
    };
    componentDidMount() {
        this.setProducts();
    };
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];
        });
        this.setState(()=>{
            return {products: tempProducts};
        });
    };

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };

    handleDetail = id =>{
        const product = this.getItem(id);
        this.setState(() => {
            return{detatilProduct: product}
        })
    };
    addToCart =id =>{
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const products = tempProducts[index];
        products.inCart = true;
        products.count = 1;
        const price = products.price;
        products.total = price;
        this.setState(() => {
            return { products: tempProducts, cart: [...this.state.cart, products] };
        },
        () => {
            console.log(this.state);
        });
    };
    openModal = id =>{
        const product = this.getItem(id);
        this.setState(() =>{
            return {modalProduct: product, modalOpen: true};
        });
    };

    closeModal = () =>{
        this.setState(()=>{
            return {modalOpen: false}
        });
    };
    increment = (id) =>{
        console.log('this id increment ');
    };
    decrement = (id) =>{
        console.log('this id decrement ');
    };
    removeItem = (id) => {
        console.log('item removed');
    };
    clearCart = () =>{
        console.log('cart was cleared');
    };
    render() {
        return(
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>                
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };