import { useState } from "react"
import sha256 from 'crypto-js/sha256'
import styles from './Create.module.css'
import ducky from '../../public/RubberDucky.jpg'
import ProductAPI from "@/lib/app/Products"

const token = '32ebb1abcc1c601ceb9c4e3c4faba0caa5b85bb98c4f1e6612c40faa528a91c9'

const initialProducts = [
  {
    id: 1,
    name: "Ducky Mr Pop",
    price: 2.99,
    image: ducky,
    stock: 1
  }
];

export default function Create() {
    const [auth, setAuth] = useState(false)
    const [err, setErr] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)
    const [valError, setValError] = useState('')
    const [products, setProducts] = useState(initialProducts)

    const authCheck = () => {
        if (sha256(password).toString() === token) {
            setAuth(true)
        } else {
            setErr("Wrong Password")
        }
    }

    const handleAddProduct = async () => {
      if (!name || !price || !image) {
        setValError("All fields must be filled");
        return;
      }
      setValError("");

      const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      try {
        const base64Image = await fileToBase64(image);

        const newProduct = {
          Name: name,
          Price: price,
          Image: base64Image,
          Stock: 1
        };

        await ProductAPI.postProduct(newProduct);
        window.location.href = '/dashboard';
      } catch (error) {
        console.error("Fehler beim Hinzufügen des Produkts:", error);
        setValError("Produkt konnte nicht hinzugefügt werden.");
      }
    };

    if (!auth) {
    return (
        <div className={styles.loginContainer}>
            <h1>Login</h1>
            <input onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder='Token' type="password" />
            <button onClick={authCheck} className={styles.button}>Submit</button>
            <h4>{err}</h4>
        </div>
    )}

    return (
        <div className={styles.container}>
          <h1>Create a Ducky</h1>
            <input onChange={(e) => setName(e.target.value)} value={name} className={styles.input} type="text" placeholder="Name"/>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className={styles.input} type="number" placeholder="Price" />
            <input onChange={(e) => setImage(e.target.files[0])} className={styles.imageInput} type="file" accept="image/*"/>
            <button className={styles.button} onClick={handleAddProduct}>Add Product</button>
            <h3>{valError}</h3>
        </div>
    )
}