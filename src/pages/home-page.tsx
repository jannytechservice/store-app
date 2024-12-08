import { useCallback, useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';

import useProductService from '../hook/useProductService';
import { ProductList } from '../components';
import { IProduct } from '../types/product';

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
      <Typography
        variant="h4"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        Shop
      </Typography>
      <ProductList products={products} />
    </Container>
  );
}
