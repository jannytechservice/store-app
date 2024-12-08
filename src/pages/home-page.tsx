import { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';

import useProductService from '../hook/useProductService';
import { ProductList } from '../components';
import { IProduct } from '../types/product';
import MainLayout from '../layouts/main-layout';

export default function HomePage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { getProducts } = useProductService();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (e) {
      console.error(e);
    }
  }, [getProducts]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mb: 15,
      }}
    >
      <ProductList products={products} />
    </Container>
  );
}
