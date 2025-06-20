import Image from "next/image";
import styles from './HomePage.module.css'
import ducky from '../../public/RubberDucky.jpg'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from "react";
import { TbShoppingCartPlus } from "react-icons/tb";
import ProductAPI from "@/lib/app/Products";

export default function HomePage() {
    const [index, setIndex] = useState(0);
    const [products, setProducts] = useState([])
    const [flyingItems, setFlyingItems] = useState([]);

    const prev = () => setIndex((prev) => (prev - 1 + products.length) % products.length);
    const next = () => setIndex((prev) => (prev + 1) % products.length);

    useEffect(() => {
        const loadProducts = async () => {
            const productArray = await ProductAPI.getProducts()
            const shuffledArray = [...productArray].sort(() => 0.5 - Math.random());
            setProducts(shuffledArray.slice(0, 5))
        }
        
        loadProducts();
    }, [])

    function calculateSliderDiff(index) {
        const range = (products.length - 1) * 300;
        const middle = (products.length - 1) / 2;
        return (middle - index) * (range / middle);
    }

    const addToCart = (product, event) => {

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].Amount += 1;
        } else {
            cart.push({ ...product, Amount: 1 });
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));

        const buttonRect = event.target.getBoundingClientRect();
        const cartIcon = document.querySelector('.cart-icon');
        const cartRect = cartIcon ? cartIcon.getBoundingClientRect() : { top: 20, right: 20 };

        const flyingItem = {
            id: Date.now() + Math.random(),
            product,
            startX: buttonRect.left + buttonRect.width / 2,
            startY: buttonRect.top + buttonRect.height / 2,
            endX: window.innerWidth - 50,
            endY: 50,
        };

        setFlyingItems(prev => [...prev, flyingItem]);

        setTimeout(() => {
            setFlyingItems(prev => prev.filter(item => item.id !== flyingItem.id));
        }, 1000);
    };

    const checkAvailability = (product) => {
        if (product.Stock > 0) {
            return true;
        }
        return false;
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}><span className="shineText"/>Premium Rubber Ducks</h1>
                <h5 className={styles.pageSubTitle}>Discover the world's finest collection of luxury rubber ducks</h5>

                <div className={styles.sliderWrapper}>
                    <div className={styles.slider} style={{ transform: `translateX(${calculateSliderDiff(index)}px)` }}>
                        {products.map((product, i) => (
                            <div key={i} className={`${styles.slide} ${i === index ? styles.active : ''}`}>
                                <img src={product.Image} alt="ducky" className={styles.ducky} />
                                <div className={styles.details}>
                                    <h1 className={styles.price}>{product.Price} Fr</h1>
                                    <h1 className={styles.name}>{product.Name}</h1>
                                    {checkAvailability(product) ? (
                                        <button 
                                            className={styles.cartButton} 
                                            onClick={(e) => addToCart(product, e)}>
                                            <TbShoppingCartPlus size={32}/>
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <button className={styles.soldOutButton}>
                                            SOLD OUT
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <IoIosArrowBack size={60} onClick={prev} className={`${styles.arrow} ${styles.arrowLeft}`}/>
                    <IoIosArrowForward size={60} onClick={next} className={`${styles.arrow} ${styles.arrowRight}`}/>
                </div>
            </div>

            {flyingItems.map((item) => (
                <div
                    key={item.id}
                    className={styles.flyingItem}
                    style={{
                        '--start-x': `${item.startX}px`,
                        '--start-y': `${item.startY}px`,
                        '--end-x': `${item.endX}px`,
                        '--end-y': `${item.endY}px`,
                    }}
                >
                    <img src={item.product.Image} alt="flying ducky" className={styles.flyingDucky} />
                </div>
            ))}
        </div>
    );
}