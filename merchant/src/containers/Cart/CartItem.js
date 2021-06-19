import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

import ProductCartItem from './ProductCartItem';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  margin: {
    padding: theme.spacing(2),
    // fontSize : theme.spacing(2),
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
  typography: {
    [theme.breakpoints.down('md')]: {
      marginBottom: '1.2rem',
    },
  },
}));

export default function CartItem() {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const [increaseDisabled, setIncreaseDisabled] = useState(false);
  const [decreaseDisabled, setDecreaseDisabled] = useState(false);

  useEffect(() => {
    if (quantity <= 0) {
      setDecreaseDisabled(true);
    } else {
      setDecreaseDisabled(false);
    }
  }, [quantity]);

  return (
    <Card elevation={5} className={classes.root}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={5}>
            <ProductCartItem />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="space-around"
            xs={12}
            sm={12}
            md={12}
            lg={4}
          >
            <Typography
              className={classes.typography}
              gutterBottom
              variant="h5"
              component="h2"
            >
              Final Price : 500 $
            </Typography>
            <Typography
              className={classes.typography}
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
            <Typography
              className={classes.typography}
              gutterBottom
              variant="h4"
              color="textSecondary"
              component="p"
            >
              Quantity : {quantity}
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="flex-end"
            xs={12}
            sm={12}
            md={12}
            lg={3}
          >
            <Grid item>
              <Button
                onClick={() => setQuantity((prevState) => prevState + 1)}
                variant="contained"
                aria-label="remove"
                size="large"
                className={classes.margin}
                fullWidth
                disabled={increaseDisabled}
              >
                Increase Quantity
                <ExpandLessOutlinedIcon className={classes.extendedIcon} />
              </Button>
              <Button
                onClick={() => setQuantity((prevState) => prevState - 1)}
                variant="contained"
                aria-label="remove"
                size="large"
                className={classes.margin}
                fullWidth
                disabled={decreaseDisabled}
              >
                Decrease Quantity
                <ExpandMoreOutlinedIcon className={classes.extendedIcon} />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                aria-label="remove"
                size="large"
                className={classes.margin}
                fullWidth
              >
                Remove This Item
                <CloseOutlinedIcon className={classes.extendedIcon} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
