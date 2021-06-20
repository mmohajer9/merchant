import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import Moment from 'react-moment';
import 'moment-timezone';
// import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1.5em',
    marginBottom: '1em',
    height: '100%',
  },
  media: {
    // height: '50%',
    // paddingTop: '100%', // 16:9
    display: 'block',
    maxWidth: '70%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  cartIcon: {
    marginRight: '.3em',
  },
  cardActions: {
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  cardActionArea: {
    display: 'flex',
  },
}));

export default function ProductCard({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAddToCart = (item) => (event) => {
    dispatch(cartActions.addToCart({ item }));
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={item.name}
        titleTypographyProps={{ noWrap: true, variant: 'body1' }}
        subheader={<Moment format="YYYY/MM/DD" data={item.updated_at} />}
      />
      <CardActionArea className={classes.cardActionArea}>
        <img className={classes.media} src={item.image} alt={item.name}></img>
        {/* <CardMedia
          // component={Link}
          // to="/profile"
          className={classes.media}
          image={item.image}
          classes={{
            root: classes.cardImage,
          }}
        /> */}
      </CardActionArea>
      <CardContent>
        <Typography noWrap variant="body2" color="textSecondary" component="p">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <IconButton
          size="large"
          color="secondary"
          aria-label="add to bookmarks"
        >
          <FavoriteIcon />
        </IconButton>
        <Typography noWrap variant="h6" color="textSecondary" component="p">
          {item.final_price} $
        </Typography>
        <Button size="large" variant="outlined" onClick={handleAddToCart(item)}>
          <AddShoppingCartOutlinedIcon className={classes.cartIcon} />
          <Typography>Add To Cart</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
