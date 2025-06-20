import React, { useRef, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { IoClose } from "react-icons/io5";
import ducky from '../../public/RubberDucky.jpg'
import Image from 'next/image';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import Link from 'next/link';

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
        const amountSum = cartjson.reduce((sum, product) => sum + (product.Amount * product.Price), 0)
        setSum(amountSum);
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
        const amountSum = newCart.reduce((sum, product) => sum + (product.Amount * product.Price), 0)
        setSum(amountSum);
    }

    const increaseAmount = (index) => {
        const newCart = [...cart]
        newCart[index].Amount += 1;
        updateCart(newCart)
    }

    const decreaseAmount = (index) => {
        const newCart = [...cart];
        if (newCart[index].Amount > 1) {
            newCart[index].Amount -= 1;
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
                                        <div className={styles.leftSection}>
                                            <img src={product.Image} alt="ducky" className={styles.ducky} />
                                            <div className={styles.leftDetails}>
                                                <h5 className={styles.name}>{product.Name}</h5>
                                                <div className={styles.amountDisplay}>
                                                    <CiCircleMinus size={23} onClick={() => decreaseAmount(i)}/>
                                                    <h4 className={styles.amount}>{product.Amount}</h4>
                                                    <CiCirclePlus size={23} onClick={() => increaseAmount(i)}/>
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className={styles.price}>{product.Price} Fr</h4>
                                    </div>
                                )
                            })}
                        </div>
                        <p>Total</p>
                        <h3>{sum.toFixed(1)}0 Fr</h3>
                    </>
                )}
                <Link onClick={onClose} href="/checkout" className={styles.checkoutButton}><TbTruckDelivery size={30} className={styles.checkoutIcon}/><span className={styles.chackoutText}>Checkout</span></Link>
            </div>
        </div>
    );
};

export default Cart;
