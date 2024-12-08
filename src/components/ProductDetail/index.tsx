import { Grid } from '@mui/material';

import { IProduct } from '@/types/product';
import { paths } from '@/routes/path';

import ProductDetailImage from './ProductDetailImage';
import ProductDetailSummary from './ProductDetailSummary';
import ProductDetailToolbar from './ProductDetailToolbar';

type Props = {
  product: IProduct;
};

export default function ProductDetail({ product }: Props) {
  return (
    <>
      <ProductDetailToolbar backLink={paths.home} />
      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid item xs={12} md={6} lg={7}>
          <ProductDetailImage src={product.image} />
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <ProductDetailSummary product={product} />
        </Grid>
      </Grid>
    </>
  );
}
