import {Grid} from '@mui/material';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_links">
        <Grid alignItems={'center'} justifyContent={'center'} container>
          <Grid item>
              University Forum&#169;
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}