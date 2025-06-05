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
        setSum(cartjson.reduce((sum, product) => sum + (product.price), 0));
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
                    <div className={styles.cartItems}>
                        {cart.map((product, i) => {
                            return (
                                <div key={i} className={styles.cartItem}>
                                    <Image src={product.image} alt="ducky" className={styles.ducky} />
                                    <div className={styles.cartItemDetails}>
                                        <h4>{product.price}</h4>
                                        <h4>{product.name}</h4>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
                <p>Total</p>
                <h3>{sum.toFixed(1)}0 Fr</h3>
            </div>
        </div>
    );
};

export default Cart;
