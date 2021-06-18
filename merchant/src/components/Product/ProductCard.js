import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { Button } from '@material-ui/core';
// import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1.5em',
    marginBottom: '1em',
    height: '100%',
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
  },
  cartIcon: {
    marginRight: '.3em',
  },
  cardActions: {
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
}));

export default function ProductCard({ item }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={item.name}
        titleTypographyProps={{ noWrap: true, variant: 'body1' }}
        subheader="September 14, 2016"
      />
      <CardMedia
        // component={Link}
        // to="/profile"
        className={classes.media}
        image={item.image}
        title="Paella dish"
        classes={{
          root: classes.cardImage,
        }}
      />
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

        <Button size="large" variant="outlined">
          <AddShoppingCartOutlinedIcon className={classes.cartIcon} />
          <Typography>Add To Cart</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
