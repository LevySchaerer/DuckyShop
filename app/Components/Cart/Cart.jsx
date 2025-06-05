import React, { useRef, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { IoClose } from "react-icons/io5";

const Cart = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        console.log(animateIn)
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setAnimateIn(true), 100);
        } else {
            setAnimateIn(false);

            const timeout = setTimeout(function() {
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
                <p>cart is currently empty.</p>
            </div>
        </div>
    );
};

export default Cart;
