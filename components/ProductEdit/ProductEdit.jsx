import { useState } from 'react';
import styles from './ProductEdit.module.css'


export default function ProductEdit({productProps}) {
    const product = productProps;
    const [price, setPrice] = useState(product.Price)
    const [name, setName] = useState(product.Name)
    const [stock, setStock] = useState(product.Stock)
    const [image, setImage] = useState(product.Image)
    const [valError, setValError] = useState('')

    const handleSave = async () => {
        if (!name || !price) {
            setValError("All fields must be filled");
            return;
        }

        const fileToBase64 = (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        setImage(await fileToBase64(image))

        const newProduct = {
            Name: name,
            Price: price,
            Stock: stock,
            Image: image
        }

        console.log(newProduct)
    }

    return ( 
        <div className={styles.container}>
            <input type="text" onChange={(e) => {setPrice(e.target.value)}} value={price} />
            <input type="text" onChange={(e) => {setName(e.target.value)}} value={name} />
            <input type="text" onChange={(e) => {setStock(e.target.value)}} value={stock} />
            <input onChange={(e) => setImage(e.target.files[0])} className={styles.imageInput} type="file" accept="image/*"/>
            <img src={product.Image} alt={product.name} className={styles.productImage} />
            <button onClick={handleSave}>Save</button>
            <h3>{valError}</h3>
        </div>
    )
}