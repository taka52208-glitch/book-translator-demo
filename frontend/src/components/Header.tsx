import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  const navButtonStyle = (isActive: boolean) => ({
    mr: 1,
    px: 2,
    fontWeight: isActive ? 600 : 400,
    color: isActive ? 'primary.main' : 'text.secondary',
    borderBottom: isActive ? '2px solid' : '2px solid transparent',
    borderColor: isActive ? 'primary.main' : 'transparent',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'rgba(74, 144, 164, 0.04)',
      borderColor: isActive ? 'primary.main' : 'grey.300',
    },
  });

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <MenuBookIcon sx={{ mr: 1.5, color: 'primary.main' }} />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'text.primary',
            fontWeight: 600,
          }}
        >
          洋書翻訳デモ
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          component={Link}
          to="/"
          sx={navButtonStyle(location.pathname === '/')}
        >
          翻訳デモ
        </Button>
        <Button
          component={Link}
          to="/workflow"
          sx={navButtonStyle(location.pathname === '/workflow')}
        >
          ワークフロー
        </Button>
      </Toolbar>
    </AppBar>
  );
};
