import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Container, Typography } from '@material-ui/core';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CartCheckOut from './CartCheckOut';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  noPurchaseIcon: {
    fontSize: theme.typography.fontSize * 7.25,
  },
}));

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const isEmpty = _.isEmpty(cart.items);
  const classes = useStyles();

  if (isEmpty) {
    return (
      <Box mt={4} mb={8}>
        <Container maxWidth="lg">
          <Card elevation={10}>
            <CardContent>
              <Grid container direction="column" alignItems="center">
                <Grid item className={classes.noPurchaseIcon}>
                  <ErrorOutlineOutlinedIcon fontSize="inherit" />
                </Grid>
                <Grid item>
                  <Typography
                    variant="h5"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                  >
                    You Have No Items In Your Cart
                  </Typography>
                  <Typography
                    variant="h5"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                  >
                    You can add some products to your shopping cart, then you
                    can checkout the items and go for purchase
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box mt={4} mb={8}>
      <Container maxWidth="xl">
        <Grid
          alignItems="flex-start"
          container
          direction="row"
          justify="center"
          spacing={3}
        >
          <Grid item container spacing={3} direction="column" xs={12} md={8}>
            {cart.items.map((cartItem, index) => (
              <Grid item key={index}>
                <CartItem item={cartItem} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <CartCheckOut items={cart.items} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
