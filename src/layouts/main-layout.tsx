import React from 'react';
import { Container } from '@mui/material';

import MainLoader from '../common/loader/MainLoader';

interface MainLayoutProps {
  children: React.ReactNode;
  loading?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, loading }) => {
  return loading ? (
    <MainLoader />
  ) : (
    <Container maxWidth="lg">{children}</Container>
  );
};

export default MainLayout;
