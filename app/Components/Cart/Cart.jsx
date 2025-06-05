import React, { useRef, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { IoClose } from "react-icons/io5";
import ducky from '../../public/RubberDucky.jpg'
import Image from 'next/image';

const Cart = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);
    const [sum, setSum] = useState(0)
    const [cart, setCart] = useState([])

    useEffect(() => {
        const cartdata = localStorage.getItem('cart');
        const cartjson = cartdata ? JSON.parse(cartdata) : [];
        setCart(cartjson)
        console.log(cartjson)
        const stockSum = cartjson.reduce((sum, product) => sum + (product.stock * product.price), 0)
        setSum(stockSum);
    }, [isOpen])
    
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setAnimateIn(true), 100);
        } else {
            setAnimateIn(false);

            const timeout = setTimeout(function () {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!isVisible) return null;

    const updateCart = (newCart) => {
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart));
        const stockSum = newCart.reduce((sum, product) => sum + (product.stock * product.price), 0)
        setSum(stockSum);
    }

    const increaseStock = (index) => {
        const newCart = [...cart]
        newCart[index].stock += 1;
        updateCart(newCart)
    }

    const decreaseStock = (index) => {
        const newCart = [...cart];
        if (newCart[index].stock > 1) {
            newCart[index].stock -= 1;
        } else {
            newCart.splice(index, 1)
        }
        updateCart(newCart)
    }

    return (
        <div className={styles.cartOverlay} onClick={onClose}>
            <div
                className={`${styles.cart} ${animateIn ? styles.slideIn : styles.slideOut}`}
                onClick={e => e.stopPropagation()}>

                <IoClose size={30} className={styles.closeButton} onClick={onClose} />
                <h2>Your Shopping Cart</h2>
                {cart && cart.length === 0 ? (
                    <p>cart is currently empty.</p>
                ) : (
                    <>
                        <div className={styles.cartItems}>
                            {cart.map((product, i) => {
                                return (
                                    <div key={i} className={styles.cartItem}>
                                        <Image src={product.image} alt="ducky" className={styles.ducky} />
                                        <div className={styles.cartItemDetails}>
                                            <h4>{product.price}</h4>
                                            <h4>{product.name}</h4>
                                            <h4>{product.stock}</h4>
                                            <button onClick={() => decreaseStock(i)}>-</button>
                                            <button onClick={() => increaseStock(i)}>+</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <p>Total</p>
                        <h3>{sum.toFixed(1)}0 Fr</h3>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
