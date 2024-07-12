import {Divider, Typography, Grid} from '@mui/material';

function NotFound() {
  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Grid item>
        <Typography variant="h2" component="h2">
          404
        </Typography>
      </Grid>
      <Divider sx={{margin: '0 50px', borderWidth: '2px', borderColor: 'white'}} orientation="vertical" variant="middle" flexItem />
      <Grid item>
        <Typography variant="h2" component="h2">
          This page could not be found.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NotFound;