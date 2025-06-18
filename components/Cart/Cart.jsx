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
        const stockSum = cartjson.reduce((sum, product) => sum + (product.Stock * product.Price), 0)
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
        const stockSum = newCart.reduce((sum, product) => sum + (product.Stock * product.Price), 0)
        setSum(stockSum);
    }

    const increaseStock = (index) => {
        const newCart = [...cart]
        newCart[index].Stock += 1;
        updateCart(newCart)
    }

    const decreaseStock = (index) => {
        const newCart = [...cart];
        if (newCart[index].Stock > 1) {
            newCart[index].Stock -= 1;
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
                                                <div className={styles.stockDisplay}>
                                                    <CiCircleMinus size={23} onClick={() => decreaseStock(i)}/>
                                                    <h4 className={styles.stock}>{product.Stock}</h4>
                                                    <CiCirclePlus size={23} onClick={() => increaseStock(i)}/>
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
