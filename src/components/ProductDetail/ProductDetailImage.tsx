import { Box } from '@mui/material';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

import Image from '@/common/image';

type Props = {
  src: string;
};

export default function ProductDetailImage({ src }: Props) {
  const theme = useTheme();
  const renderImage = useMemo(() => {
    return (
      <Box
        sx={{
          mb: 3,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image
          key={src}
          alt={src}
          src={src}
          ratio="1/1"
          sx={{ cursor: 'zoom-in' }}
        />
      </Box>
    );
  }, [src]);
  return (
    <Box
      sx={{
        '& .slick-slide': {
          float: theme.direction === 'rtl' ? 'right' : 'left',
        },
      }}
    >
      {renderImage}
    </Box>
  );
}
