import { useEffect, useState } from 'react';
import styles from './Products.module.css';
import ProductAPI from '@/lib/app/Products';

export default function Products() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const loadProducts = async () => {
			const data = await ProductAPI.getProducts();
			console.log(data);
			setProducts(data);
		};

		loadProducts();
	}, []);

	return (
		<div className={styles.body}>
			{products.map((product, i) => (
				<div
					key={i}
					className={`${styles.product} ${product.Stock === 0 ? styles.soldOut : ''}`}
				>
					<h3>{product.Name}</h3>
					<h3>{product.Price} Fr</h3>
					<h3>{product.Stock === 0 ? 'Sold Out' : `Stock: ${product.Stock}`}</h3>
					<div className={styles.imageContainer}>
						<img src={product.Image} alt={product.Name} />
						{product.Stock === 0 && (
							<div className={styles.soldOutOverlay}>
								<span className={styles.soldOutText}>SOLD OUT</span>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
