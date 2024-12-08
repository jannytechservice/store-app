import { useCallback, useEffect, useState } from 'react';

import useProductService from '@/hook/useProductService';
import { IProduct } from '@/types/product';
import MainLayout from '@/layouts/main-layout';
import { ProductDetail } from '@/components';
import { useParams } from '@/routes/hook';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProduct>();
  const { getProduct } = useProductService();
  const fetchProduct = useCallback(async () => {
    try {
      if (id) {
        const response = await getProduct(id);
        setProduct(response);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [getProduct, id]);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <MainLayout loading={loading}>
      {product && <ProductDetail product={product} />}
    </MainLayout>
  );
};

export default ProductDetailPage;
