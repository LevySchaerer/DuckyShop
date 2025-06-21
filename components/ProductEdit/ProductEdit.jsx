import { useState } from 'react';
import styles from './ProductEdit.module.css';
import ProductAPI from '@/lib/app/Products';

export default function ProductEdit({ productProps }) {
	const product = productProps;
	const [price, setPrice] = useState(product.Price);
	const [name, setName] = useState(product.Name);
	const [stock, setStock] = useState(product.Stock);
	const [image, setImage] = useState();
	const [valError, setValError] = useState('');

	const handleSave = async () => {
		if (!name || !price || !stock) {
			setValError('All fields must be filled');
			return;
		}

		const fileToBase64 = (file) =>
			new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = (error) => reject(error);
			});

		if (image) {
			const base64Image = await fileToBase64(image);
			setImage(base64Image);
		}

		const newProduct = {
			Name: name,
			Price: price,
			Stock: stock,
			...(image && { Image: image }),
		};

		ProductAPI.updateProduct(newProduct, product.ProductID);
		window.location.href = '/dashboard';
	};

	return (
		<div className={styles.container}>
			<input
				type="text"
				onChange={(e) => {
					setPrice(e.target.value);
				}}
				value={price}
			/>
			<input
				type="text"
				onChange={(e) => {
					setName(e.target.value);
				}}
				value={name}
			/>
			<input
				type="text"
				onChange={(e) => {
					setStock(e.target.value);
				}}
				value={stock}
			/>
			<input
				onChange={(e) => setImage(e.target.files[0])}
				className={styles.imageInput}
				type="file"
				accept="image/*"
			/>
			<img src={product.Image} alt={product.Name} className={styles.productImage} />
			<button onClick={handleSave}>Save</button>
			<h3>{valError}</h3>
		</div>
	);
}
