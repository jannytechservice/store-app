import { Grid } from '@mui/material';

import { IProduct } from '@/types/product';
import { paths } from '@/routes/path';

import ProductDetailImage from './product-detail-image';
import ProductDetailSummary from './product-detail-summary';
import ProductDetailToolbar from './product-detail-toolbar';

type ProductDetailProps = {
  product: IProduct;
};

export default function ProductDetail({ product }: ProductDetailProps) {
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
