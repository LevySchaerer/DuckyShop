"use client"
import Image from "next/image";
import styles from './HomePage.module.css'
import ducky from '../../public/RubberDucky.jpg'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Ducky Mr Pop",
    price: 2.99,
    image: ducky,
    stock: 1
  },
  {
    id: 2,
    name: "Ducky Dr Max",
    price: 2.99,
    image: ducky,
    stock: 1
  },
  {
    id: 3,
    name: "Ducky Mrs Pop",
    price: 2.99,
    image: ducky,
    stock: 1
  }
];

export default function HomePage() {
    const [index, setIndex] = useState(0);

    const prev = () => setIndex((prev) => (prev - 1 + products.length) % products.length);
    const next = () => setIndex((prev) => (prev + 1) % products.length);

const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].stock += 1;
    } else {
        cart.push({ ...product, stock: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};

    return (
        <div className={styles.body}>
            <div className={styles.container}>

                <IoIosArrowBack size={60} onClick={prev} className={styles.arrow}/>
                <div className={styles.sliderWrapper}>
                    <div className={styles.slider} style={{ transform: `translateX(-${index * 100}%)` }}>
                        {products.map((product, i) => (
                            <div key={i} className={`${styles.slide} ${i === index ? styles.active : ''}`}>
                                <Image src={product.image} alt="ducky" className={styles.ducky} />
                                <div className={styles.details}>
                                    <h1>{product.price} Fr</h1>
                                    <h2>{product.name}</h2>
                                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <IoIosArrowForward size={60} onClick={next} className={styles.arrow}/>
            </div>
        </div>
    );
}
