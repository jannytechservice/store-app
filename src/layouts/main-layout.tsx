import React from 'react';
import { Box } from '@mui/material';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, md: 10 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
