import { Box, Button, Stack, StackProps } from '@mui/material';

import Iconify from '@/common/iconify';
import { RouterLink } from '@/routes/components';

type Props = StackProps & {
  backLink: string;
};

export default function ProductDetailToolbar({
  backLink,
  sx,
  ...other
}: Props) {
  return (
    <Stack
      spacing={1.5}
      direction="row"
      sx={{
        mb: { xs: 3, md: 5 },
        ...sx,
      }}
      {...other}
    >
      <Button
        component={RouterLink}
        href={backLink}
        startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        color="inherit"
      >
        Back
      </Button>

      <Box sx={{ flexGrow: 1 }} />
    </Stack>
  );
}
