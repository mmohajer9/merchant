import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';

import CheckOut from './CheckOut';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

export default function Cart() {
  const cart = useSelector((state) => state.cart);

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
              <Grid item>
                <CartItem key={index} item={cartItem} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <CheckOut items={cart.items} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
