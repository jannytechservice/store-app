import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import Box, { BoxProps } from '@mui/material/Box';

import { IconProps } from './types';

// ----------------------------------------------------------------------

interface IconifyProps extends BoxProps {
  icon: IconProps;
  width?: string | number;
}

const Iconify = forwardRef<SVGElement, IconifyProps>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      sx={{
        display: 'inline-flex',
        width,
        height: width,
        ...sx,
      }}
      {...other}
    >
      <Icon icon={icon} width={width} height={width} />
    </Box>
  ),
);

Iconify.displayName = 'Iconify';

export default Iconify;
