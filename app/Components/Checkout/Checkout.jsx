import styles from "./Checkout.module.css"
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaInfo } from "react-icons/fa";

const Checkout = () => {
    const [sum, setSum] = useState(0)
    const [cart, setCart] = useState([])

    useEffect(() => {
        const cartdata = localStorage.getItem('cart');
        const cartjson = cartdata ? JSON.parse(cartdata) : [];
        setCart(cartjson)
        console.log(cartjson)
        const stockSum = cartjson.reduce((sum, product) => sum + (product.stock * product.price), 0)
        setSum(stockSum);
    }, [])

    return (
        <div className={styles.body}>
            <div className={styles.checkoutContainer}>
                <div className={styles.leftSection}>
                    <h1 className={styles.title}>Checkout</h1>
                    <h2 className={styles.sectionTitle}>Delivery</h2>

                    <h3 className={styles.CheckoutInputTitel}>First Name</h3>
                    <input className={styles.CheckoutInput} placeholder="Saul" type="text" />
                    <h3 className={styles.CheckoutInputTitel}>Name</h3>
                    <input className={styles.CheckoutInput} placeholder="Goodman" type="text" />
                    <h3 className={styles.CheckoutInputTitel}>Mobile</h3>
                    <input className={styles.CheckoutInput} placeholder="+41 77 483 97 83" type="text" />
                    <h3 className={styles.CheckoutInputTitel}>Adress</h3>
                    <input className={styles.CheckoutInput} placeholder="Broadway 63" type="text" />
                    <h3 className={styles.CheckoutInputTitel}>PLZ</h3>
                    <input className={styles.CheckoutInput} placeholder="Tarrytown 10591" type="text" />
                    <h3 className={styles.CheckoutInputTitel}>Ciry</h3>
                    <input className={styles.CheckoutInput} placeholder="New York" type="text" />
                </div>
                <div className={styles.rightSection}>
                    <h2 className={styles.sectionTitle}>Payment</h2>

                    <div className={styles.CartItems}>
                        {cart.map((product, i) => {
                            return (
                                <div key={i} className={styles.cartItem}>
                                    <div className={styles.leftCartSection}>
                                        <Image src={product.image} alt="ducky" className={styles.ducky} />
                                        <div className={styles.leftDetails}>
                                            <h5 className={styles.name}>{product.name}</h5>
                                            <h5>stock {product.stock}</h5>
                                        </div>
                                    </div>
                                    <h4 className={styles.price}>{product.price} Fr</h4>
                                </div>
                            )
                        })}
                    </div>
                
                    <h3 className={styles.totalPrice}>Total: <span>{sum.toFixed(1)}0 Fr</span></h3>
                    
                    <div className={styles.paymentSection}>
                        <p className={styles.paymentInfo}><FaInfo className={styles.infoIcon}/>Please do not change the amount in the App, otherwise the order cannot be delivered.</p>
                        <button className={styles.twintButton} onClick={() => window.open(`https://go.twint.ch/1/e/tw?tw=acq.gB5Bt_P0Tlm4uYagE3XGhD34KJs-T0giOnsiOTj__q7SqT6rUJkBT23frkZrmONz.&amount=${sum}`, '_blank')}>
                            <img className={styles.twintImage} alt="Embedded TWINT button" src="https://go.twint.ch/static/img/button_dark_en.svg"/>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;