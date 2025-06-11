import { useState } from 'react'
import styles from './dashboard.module.css'
import sha256 from 'crypto-js/sha256'
import ducky from '../../public/RubberDucky.jpg'
import Image from 'next/image'

import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const token = '9d01b00876449148347bf4c01395553173fcaa479db1925b706974c1b06f7126'

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
    },
    {
        id: 4,
        name: "Mrs Pop",
        price: 2.99,
        image: ducky,
        stock: 1
    }
];



export default function Dashboard() {
    const [auth, setAuth] = useState(true)
    const [err, setErr] = useState('')
    const [password, setPassword] = useState('')
    const [selectedTab, setSelectedTab] = useState('Products')

    const authCheck = () => {
        if (sha256(password).toString() === token) {
            setAuth(true)
        } else {
            setErr("Wrong Password")
        }
    }

    if (!auth) {
        return (
            <div className={styles.loginContainer}>
                <h1>Login</h1>
                <input onChange={(e) => setPassword(e.target.value)} placeholder='Token' type="password" />
                <button onClick={authCheck} className={styles.button}>Submit</button>
                <h4>{err}</h4>
            </div>
        )
    }

    return (
        <div className={styles.body}>
            <div className={styles.topSelector}>
                <button className={`${styles.selectorButton} ${selectedTab === 'Products' ? styles.active : ''}`} onClick={() => setSelectedTab('Products')}>Products</button>
                <button className={`${styles.selectorButton} ${selectedTab === 'Orders' ? styles.active : ''}`} onClick={() => setSelectedTab('Orders')}>Orders</button>
            </div>

            <div className={styles.content}>
                {selectedTab === 'Products' && (
                    <div className={styles.products}>
                        {products.map((product, i) => (
                            <div key={i} className={styles.product}>
                                <div className={styles.productContent}>
                                    <div><Image src={product.image} className={styles.duckyImage} alt={product.name} /></div>
                                    <div>
                                        <h3>{product.name}</h3>
                                        <h3>{product.price}</h3>
                                    </div>
                                </div>
                                <div className={styles.productEdit}>
                                    <FaRegEdit className={styles.editIcons} size={20} />
                                    <FaRegTrashCan className={styles.editIcons} color='#b81d1d' size={20} />
                                </div>
                            </div>
                        ))

                        }
                    </div>
                )}
                {selectedTab === 'Orders' && (
                    <div className={styles.stages}>
                        <div className={styles.stage1}>

                        </div>
                        <div className={styles.stage2}>

                        </div>
                        <div className={styles.stage3}>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

