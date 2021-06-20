import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  checkOutButton: {
    fontSize: '1.5rem',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[500],
    },
  },
});

export default function CheckOut({ items }) {
  const classes = useStyles();
  const { userInfo } = useSelector((state) => state.auth);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const calculateCart = (items) => {
      const reducer = (acc, item) => acc + item.properties.final_price;
      const result = items.reduce(reducer, 0);
      setTotalAmount(result);
    };

    calculateCart(items);
  }, [items]);
  return (
    <Card elevation={5} className={classes.root}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h5" color="textPrimary" gutterBottom>
              Total Payments Amount
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" color="textPrimary" gutterBottom>
              {totalAmount} $
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardContent>
        <Box>
          <Grid container justify="space-between">
            <Grid item xs={8}>
              <Typography variant="overline" color="textPrimary" gutterBottom>
                Items
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="overline" color="textPrimary" gutterBottom>
                Price
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="overline" color="textPrimary" gutterBottom>
                Final Price
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          {items.map((item, index) => (
            <Grid key={index} container justify="space-between">
              <Grid item xs={8}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {item.count} x {item.properties.name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {+item.properties.price * +item.count}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {+item.properties.final_price * +item.count}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          className={classes.checkOutButton}
          variant="contained"
          fullWidth
          size="large"
          color="secondary"
          disabled={userInfo.balance < totalAmount}
        >
          {userInfo.balance < totalAmount ? 'Not Enough Balance' : 'Check Out'}
        </Button>
      </CardActions>
    </Card>
  );
}
