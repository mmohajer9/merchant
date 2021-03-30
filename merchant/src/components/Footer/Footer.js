import {
  Box,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";

import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import monitorIcon from "../../assets/logistics/051-monitor screen.svg";
import posIcon from "../../assets/logistics/047-pos terminal.svg";
import supportIcon from "../../assets/logistics/042-woman.svg";
import cardBoardIcon from "../../assets/logistics/018-cardboard.svg";
import cargoTruckIcon from "../../assets/logistics/007-delivery truck.svg";
import clipboardIcon from "../../assets/logistics/014-clipboard.svg";
import { Link } from "react-router-dom";

import clsx from "clsx";
import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
  icons: {
    width: "5rem",
  },
  feature: {
    marginBottom: theme.spacing(1),
  },
  footerContainer: {
    margin: theme.spacing(2, 0, 2, 0),
  },
  footerItem: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(2),
  },
  footerText: {
    margin: theme.spacing(1, 0, 1, 0),
    textDecoration: "none",
  },
  centerFooterItem: {
    alignSelf: "center",
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <Box component="footer" marginTop={2}>
      <Grid
        alignItems="center"
        justify="space-evenly"
        direction="row"
        container
      >
        <Grid
          item
          container
          className={classes.feature}
          alignItems="center"
          direction="column"
          xs={6}
          sm={4}
          md
        >
          <Grid item>
            <img
              className={classes.icons}
              alt="monitorIcon"
              src={monitorIcon}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2">Online Shopping</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          className={classes.feature}
          alignItems="center"
          direction="column"
          xs={6}
          sm={4}
          md
        >
          <Grid item>
            <img className={classes.icons} alt="posIcon" src={posIcon} />
          </Grid>
          <Grid item>
            <Typography align="justify" variant="body2">
              Online Payment
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          className={classes.feature}
          alignItems="center"
          direction="column"
          xs={6}
          sm={4}
          md
        >
          <Grid item>
            <img
              className={classes.icons}
              alt="supportIcon"
              src={supportIcon}
            />
          </Grid>
          <Grid item>
            {" "}
            <Typography align="justify" variant="body2">
              24/7 Support
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          className={classes.feature}
          alignItems="center"
          direction="column"
          xs={6}
          sm={4}
          md
        >
          <Grid item>
            <img
              className={classes.icons}
              alt="cardBoardIcon"
              src={cardBoardIcon}
            />
          </Grid>
          <Grid item>
            {" "}
            <Typography align="justify" variant="body2">
              Product Guarantee
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          className={classes.feature}
          alignItems="center"
          direction="column"
          xs={6}
          sm={4}
          md
        >
          <Grid item>
            <img
              className={classes.icons}
              alt="cargoTruckIcon"
              src={cargoTruckIcon}
            />
          </Grid>
          <Grid item>
            {" "}
            <Typography align="justify" variant="body2">
              Online Delivery
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          className={classes.feature}
          alignItems="center"
          direction="column"
          xs={6}
          sm={4}
          md
        >
          <Grid item>
            <img
              className={classes.icons}
              alt="clipboardIcon"
              src={clipboardIcon}
            />
          </Grid>
          <Grid item>
            {" "}
            <Typography align="justify" variant="body2">
              Online Receipt
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        className={classes.footerContainer}
        alignItems="flex-start"
        justify="center"
        direction="row"
        container
      >
        <Grid
          className={classes.footerItem}
          item
          container
          direction="column"
          xs
        >
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textPrimary" variant="h5">
              Shopping Guide
            </Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">How To Purchase</Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">Delivery Methods</Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">Payment Methods</Typography>
          </Grid>
        </Grid>
        <Grid
          className={classes.footerItem}
          item
          container
          direction="column"
          xs
        >
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textPrimary" variant="h5">
              Customer Services
            </Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">
              Frequent Asked Questions
            </Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">Product Refund</Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">Terms and Conditions</Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">Privacy Policy</Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">Bug Report</Typography>
          </Grid>
        </Grid>
        <Grid
          className={classes.footerItem}
          item
          container
          direction="column"
          xs
        >
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textPrimary" variant="h5">
              Merchant Community
            </Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">
              How To Become a Seller On Merchant
            </Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">
              How To Become a Provider
            </Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">Career Opportunities</Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">Contact Us</Typography>
          </Grid>
          <Grid component={Link} to="/" className={classes.footerText} item>
            <Typography color="textSecondary">About Us</Typography>
          </Grid>
        </Grid>
        <Grid
          className={clsx(classes.footerItem, classes.centerFooterItem)}
          item
          container
          direction="column"
          xs
        >
          <Grid className={classes.footerText} item>
            <Typography color="textPrimary" variant="h6">
              Follow Us In Social Media :
            </Typography>
          </Grid>
          <Grid className={classes.footerText} item container>
            <IconButton size="medium">
              <InstagramIcon />
            </IconButton>
            <IconButton size="medium">
              <TwitterIcon />
            </IconButton>
            <IconButton size="medium">
              <FacebookIcon />
            </IconButton>
            <IconButton size="medium">
              <LinkedInIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Box mt={10} mb={10}>
        <Copyright />
      </Box>
    </Box>
  );
};

export default Footer;
