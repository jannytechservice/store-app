import { Box, Rating, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

import { IProduct } from '@/types/product';

type ProductDetailSummaryProps = {
  product: IProduct;
};

export default function ProductDetailSummary({
  product,
}: ProductDetailSummaryProps) {
  const renderPrice = useMemo(
    () => <Box sx={{ typography: 'h5' }}>{`$${product.price}`}</Box>,
    [product.price],
  );

  const renderLabels = useMemo(
    () => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          component="span"
          sx={{
            typography: 'overline',
            color: 'success.main',
          }}
        >
          {product.category}
        </Box>
      </Stack>
    ),
    [product.category],
  );

  const renderRating = useMemo(
    () => (
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          color: 'text.disabled',
          typography: 'body2',
        }}
      >
        <Rating
          size="small"
          value={product.rating?.rate}
          precision={0.1}
          readOnly
          sx={{ mr: 1 }}
        />
        {`${product.rating?.count} reviews`}
      </Stack>
    ),
    [product.rating?.count, product.rating?.rate],
  );

  const renderSubDescription = useMemo(
    () => (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {product.description}
      </Typography>
    ),
    [product.description],
  );
  return (
    <Stack spacing={3} sx={{ pt: 3 }}>
      <Stack spacing={2} alignItems="flex-start">
        {renderLabels}
        <Typography variant="h5">{product.title}</Typography>
        {renderRating}
        {renderPrice}
        {renderSubDescription}
      </Stack>
    </Stack>
  );
}
