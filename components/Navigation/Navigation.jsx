'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';
import { GiShoppingCart } from "react-icons/gi";
import Cart from '../Cart/Cart';

const Navigation = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cart, setCart ] = useState([])
    const [cartAmount, setCartAmount] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            const cartData = JSON.parse(localStorage.getItem('cart'))
            setCart(cartData)
    
            const total = cartData.reduce((sum, product) => sum + (product.Amount), 0)
            setCartAmount(total)
        }, 500);

        return () => clearInterval(interval)
    }, [])


    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.links}>
                <ul>
                    <li><Link href="/aboutus">About Us</Link></li>
                    <p className={styles.cartAmount}>{cartAmount}</p>
                    <li><Link href=""><GiShoppingCart onClick={toggleCart} size={30} /></Link></li>
                </ul>
            </div>
            <Cart isOpen={cartOpen} onClose={toggleCart} />
        </nav>
    );
};

export default Navigation;