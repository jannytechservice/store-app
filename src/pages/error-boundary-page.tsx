import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ErrorBoundaryPage() {
  return (
    <Container maxWidth="lg" sx={{ mb: 15 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
        }}
      >
        <Typography variant="h2" color="error" sx={{ mb: 3 }}>
          Something went wrong
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          We’re sorry, but an unexpected error has occurred.
        </Typography>
        <Typography variant="body1" sx={{ mb: 5 }}>
          Please try refreshing the page, or you can go back to the homepage.
        </Typography>
        <Box>
          <Button
            variant="contained"
            component={Link}
            to="/"
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Go to Homepage
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
