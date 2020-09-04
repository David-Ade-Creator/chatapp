import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  useTheme,
  createStyles
} from "@material-ui/core/styles";

const drawerWidth = 240;
const cover2 = 50;

const useStyles = makeStyles((Theme) =>
  createStyles({
    root: {
      display: "flex",
      color:'black',
    },
    drawer: {
      [Theme.breakpoints.up("xl")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    menuButton: {
      marginRight: Theme.spacing(2),
      [Theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    // necessary for content to be below app bar
    toolbar: Theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: Theme.spacing(3)
    }
  })
);


export default function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <AppBar className={classes.root} backgroundcolor="transparent" elevation={0}>
      <CssBaseline />
      <div position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
            style={{color:'white'}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{color:'white'}} noWrap>
            Fullstack Developer
          </Typography>
        </Toolbar>
      </div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </AppBar>
  );
}