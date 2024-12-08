import { Box, Rating, Stack, Typography } from '@mui/material';

import { IProduct } from '@/types/product';

type ProductDetailSummaryProps = {
  product: IProduct;
};

export default function ProductDetailSummary({
  product,
}: ProductDetailSummaryProps) {
  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>{`$${product.price}`}</Box>
  );
  const renderLabels = (
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
  );
  const renderRating = (
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
  );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {product.description}
    </Typography>
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
