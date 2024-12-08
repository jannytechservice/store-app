import Box, { BoxProps } from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

export default function MainLoader({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        right: 0,
        width: 1,
        bottom: 0,
        height: 1,
        zIndex: 9998,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        ...sx,
      }}
      {...other}
    >
      <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
    </Box>
  );
}
