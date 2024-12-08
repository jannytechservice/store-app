import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import { useMemo } from 'react';

import { RouterLink } from '@/routes/components';

import Image from '../../common/image';
import { IProduct } from '../../types/product';

// ----------------------------------------------------------------------

type ProductCardProps = {
  product: IProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { id, title, image } = product;

  const renderImages = useMemo(
    () => (
      <Stack
        spacing={0.5}
        direction="row"
        sx={{
          p: (theme) => theme.spacing(1, 1, 0, 1),
        }}
      >
        <Stack flexGrow={1} sx={{ position: 'relative' }}>
          <Image
            alt={title}
            src={image}
            sx={{ borderRadius: 1, height: 164, width: 1 }}
          />
        </Stack>
      </Stack>
    ),
    [image, title],
  );

  const renderTexts = useMemo(
    () => (
      <ListItemText
        sx={{
          p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
        }}
        secondary={
          <Link component={RouterLink} href={`/products/${id}`} color="inherit">
            {title}
          </Link>
        }
        primaryTypographyProps={{
          typography: 'caption',
          color: 'text.disabled',
        }}
        secondaryTypographyProps={{
          mt: 1,
          noWrap: true,
          component: 'span',
          color: 'text.primary',
          typography: 'subtitle1',
        }}
      />
    ),
    [id, title],
  );

  return (
    <Card>
      {renderImages}
      {renderTexts}
    </Card>
  );
}
