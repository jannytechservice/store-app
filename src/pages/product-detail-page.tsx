import { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';

import useProductService from '@/hook/useProductService';
import { IProduct } from '@/types/product';
import { ProductDetail } from '@/components';
import { useParams } from '@/routes/hook';

export default function ProductDetailPage() {
  const { id } = useParams();
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
    }
  }, [getProduct, id]);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mb: 15,
      }}
    >
      {product && <ProductDetail product={product} />}
    </Container>
  );
}
