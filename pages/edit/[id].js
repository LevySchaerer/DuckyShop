import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProductAPI from '@/lib/app/Products';
import ProductEdit from '@/components/ProductEdit/ProductEdit';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const fetchedProduct = await ProductAPI.getProduct(id);

      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center p-4">Loading...</div>;

  return (
    <div>
        <ProductEdit productProps={product} />
    </div>
  );
}