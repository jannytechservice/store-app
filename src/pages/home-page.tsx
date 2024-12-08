import { useCallback, useEffect, useState } from 'react';

import useProductService from '../hook/useProductService';
import { ProductList } from '../components';
import { IProduct } from '../types/product';
import MainLayout from '../layouts/main-layout';

const HomePage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { getProducts } = useProductService();
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [getProducts]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <MainLayout loading={loading}>
      <ProductList products={products} />
    </MainLayout>
  );
};

export default HomePage;
