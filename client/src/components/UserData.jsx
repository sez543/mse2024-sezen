import * as React from 'react';
import {Box, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Badge, Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useLogin} from '../hooks/index';
import {useNavigate} from 'react-router-dom';

import {deepOrange} from '@mui/material/colors';

const settings = ['Logout'];

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px #3f50b5`
  }
}));

const UserData = (props) => {
  const {role} = props;
  const navigate = useNavigate();
  const {userData, handleLogout} = useLogin();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    switch (setting) {
      case 'Logout':
        handleLogout();
        navigate('/login');
        break;
    }

    setAnchorElUser(null);
  };

  return (
    <Box sx={{flexGrow: 0}}>
      <Tooltip title="Open settings">
        <Grid gap={2} alignItems={'center'} container>
          <Grid item>
            <Typography textAlign="center">Hello, {userData.name.split(' ')[0]}{role === 'ADMIN' ? ' (Site Admin)' : ''}</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
              <StyledBadge overlap="circular" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} variant="dot">
                <Avatar sx={{bgcolor: deepOrange[700], color: 'white'}} alt={userData.username} src="/static/images/avatar/2.jpg" />
              </StyledBadge>
            </IconButton>
          </Grid>
        </Grid>
      </Tooltip>
      <Menu
        sx={{mt: '45px'}}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu.bind(this, setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserData;
