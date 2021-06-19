import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  checkOutButton: {
    fontSize: '1.5rem',
    backgroundColor: green[500],
    '&:hover' : {
      backgroundColor: green[500],
    }
  },
});

export default function CheckOut() {
  const classes = useStyles();

  return (
    <Card elevation={5} className={classes.root}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Total Payments Amount:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              150$
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Product1
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              50$
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Product1
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              50$
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Product1
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              50$
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          className={classes.checkOutButton}
          variant="contained"
          fullWidth
          size="large"
          color="secondary"
        >
          Check Out
        </Button>
      </CardActions>
    </Card>
  );
}
