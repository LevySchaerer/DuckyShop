"use client"
import Image from "next/image";
import styles from './HomePage.module.css'
import ducky from '../../public/RubberDucky.jpg'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

const images = [ducky, ducky, ducky]; // ggf. erweitern

export default function HomePage() {
    const [index, setIndex] = useState(0);

    const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
    const next = () => setIndex((prev) => (prev + 1) % images.length);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <IoIosArrowBack size={60} onClick={prev} className={styles.arrow}/>
                <div className={styles.sliderWrapper}>
                    <div
                        className={styles.slider}
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                        {images.map((img, i) => (
                            <div
                                key={i}
                                className={`${styles.slide} ${i === index ? styles.active : ''}`}
                            >
                                <Image src={img} alt="ducky" className={styles.ducky} />
                            </div>
                        ))}
                    </div>
                </div>
                <IoIosArrowForward size={60} onClick={next} className={styles.arrow}/>
            </div>
        </div>
    );
}
