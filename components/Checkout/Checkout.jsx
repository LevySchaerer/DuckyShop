import styles from "./Checkout.module.css"
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaInfo } from "react-icons/fa";
import sha256 from 'crypto-js/sha256'

const Checkout = () => {
    const [sum, setSum] = useState(0)
    const [cart, setCart] = useState([])
    const [userToken, setUserToken] = useState("")
    const [form, setForm] = useState({
    firstName: "",
    name: "",
    mobile: "",
    address: "",
    plz: "",
    village: "",
    city: ""
    });

    useEffect(() => {
        const cartdata = localStorage.getItem('cart');
        const cartjson = cartdata ? JSON.parse(cartdata) : [];
        setCart(cartjson)
        console.log(cartjson)
        const stockSum = cartjson.reduce((sum, product) => sum + (product.stock * product.price), 0)
        setSum(stockSum);
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { firstName, name, mobile, address, plz, city } = form;
        if (!firstName || !name || !mobile || !address || !plz || !city) {
            console.log("1")
            return false;
        }

        const phoneRegex = /^\+?\d{7,15}$/;
        if (!phoneRegex.test(mobile)) {
            console.log("2")
            return false;
        }

        const plzRegex = /^\d{4,6}$/;
        if (!plzRegex.test(plz)) {
            console.log("3")
            return false;
        }
        setUserToken(sha256(mobile).toString())

        return true;
    };


    const handleSubmit = () => {
        if (!validateForm()) return;

        const url = `https://go.twint.ch/1/e/tw?tw=acq.gB5Bt_P0Tlm4uYagE3XGhD34KJs-T0giOnsiOTj__q7SqT6rUJkBT23frkZrmONz.&amount=${sum}&trxInfo=${userToken}`
        window.open(url, '_blank')

        const order = {
            userToken: userToken,
            firstName: form.firstName,
            name: form.name,
            mobile: form.mobile,
            address: form.address,
            plz: form.plz,
            city: form.city
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.checkoutContainer}>
                <div className={styles.leftSection}>
                    <h1 className={styles.title}>Checkout</h1>
                    <h2 className={styles.sectionTitle}>Delivery</h2>

                    <h3 className={styles.CheckoutInputTitel}>First Name</h3>
                    <input className={styles.CheckoutInput} placeholder="Saul" type="text" name="firstName" value={form.firstName} onChange={handleChange} />
                    <h3 className={styles.CheckoutInputTitel}>Name</h3>
                    <input className={styles.CheckoutInput} placeholder="Goodman" type="text" name="name" value={form.name} onChange={handleChange}/>
                    <h3 className={styles.CheckoutInputTitel}>Mobile</h3>
                    <input className={styles.CheckoutInput} placeholder="+41 77 483 97 83" type="text" name="mobile" value={form.mobile} onChange={handleChange}/>
                    <h3 className={styles.CheckoutInputTitel}>Adress</h3>
                    <input className={styles.CheckoutInput} placeholder="Broadway 63" type="text" name="address" value={form.address} onChange={handleChange}/>
                    <h3 className={styles.CheckoutInputTitel}>PLZ</h3>
                    <input className={styles.CheckoutInput} placeholder="10591" type="text" name="plz" value={form.plz} onChange={handleChange}/>
                    <h3 className={styles.CheckoutInputTitel}>Village</h3>
                    <input className={styles.CheckoutInput} placeholder="Tarrytown" type="text" name="village" value={form.village} onChange={handleChange}/>
                    <h3 className={styles.CheckoutInputTitel}>City</h3>
                    <input className={styles.CheckoutInput} placeholder="New York" type="text" name="city" value={form.city} onChange={handleChange}/>
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
                        <button className={styles.twintButton} onClick={handleSubmit}>
                            <img className={styles.twintImage} alt="Embedded TWINT button" src="https://go.twint.ch/static/img/button_dark_en.svg"/>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;