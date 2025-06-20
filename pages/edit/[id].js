import { useRouter } from 'next/router';
import styles from './edit.module.css'
import sha256 from 'crypto-js/sha256'
import { useState, useEffect } from 'react';
import ProductAPI from '@/lib/app/Products';
import ProductEdit from '@/components/ProductEdit/ProductEdit';

const token = '5EB1BB4D5EBD1578ED23535220158822321975646B3A37D5EE5ED3542887BE33'

export default function EditProduct() {
  const [auth, setAuth] = useState(false)
  const [err, setErr] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const fetchedProduct = await ProductAPI.getProduct(id);

      setProduct(fetchedProduct[0]);
    };

    fetchProduct();
  }, [id]);


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
            <input onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder='Token' type="password" />
            <button onClick={authCheck} className={styles.button}>Submit</button>
            <h4>{err}</h4>
        </div>
  )}
  
  if (!product) return <div className="text-center p-4">Loading...</div>;
  
  return (
    <div>
        <ProductEdit productProps={product} />
    </div>
  );
}