'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';
import { GiShoppingCart } from "react-icons/gi";
import Cart from '../Cart/Cart';

const Navigation = () => {
    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.links}>
                <ul>
                    <li><Link href="/aboutus">About Us</Link></li>
                    <li><Link href=""><GiShoppingCart onClick={toggleCart} size={30} /></Link></li>
                </ul>
            </div>
            <Cart isOpen={cartOpen} onClose={toggleCart} />
        </nav>
    );
};

export default Navigation;
