import {Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const Logo = (props) => {
  const {isMobile} = props;

  return (
    <Typography
      variant="h6"
      noWrap
      component={Link}
      to="/"
      sx={{
        mr: 2,
        display: isMobile ? {xs: 'flex', md: 'none'} : {xs: 'none', md: 'flex'},
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none'
      }}
    >
      Uni Forum
    </Typography>
  );
};

export default Logo;
