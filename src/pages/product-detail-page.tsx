import { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';

import useProductService from '@/hook/useProductService';
import { IProduct } from '@/types/product';
import { ProductDetail } from '@/components';
import { useParams } from '@/routes/hook';
import MainLoader from '@/common/loader/MainLoader';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  const { getProduct, loading } = useProductService();
  const fetchProduct = useCallback(async () => {
    try {
      if (id) {
        const response = await getProduct(id);
        setProduct(response);
      }
    } catch (e) {
      toast.error('An unexpected error occurred');
    }
  }, [getProduct, id]);

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return <MainLoader />;
  }

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
