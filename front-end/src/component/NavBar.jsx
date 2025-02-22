import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Button, Divider,  IconButton, Toolbar, InputBase, Box, Badge, Menu, MenuItem, Stack } from '@mui/material';

// ICON
import { Menu as MenuIcon, 
  Search as SearchIcon, 
  Mail as MailIcon, 
  Notifications as NotificationsIcon, 
  AccountCircle, 
  MoreVert as MoreIcon,
  Brightness4 as Brightness4Icon,
  ZoomOutMap as ZoomOutMapIcon
} from '@mui/icons-material';

//
import logo from '../assets/logo.png';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.white,
  border: `1px solid ${theme.palette.grey[600]}`, // Added border for visibility
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.black,  // Set the icon color for better visibility
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.gray,  // Set the input text color to white for contrast
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const BlinkingBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.main,
    borderRadius: "50%",
    height: 8,
    width: 8,
    minWidth: "unset", // Remove the default min-width
    animation: "blinking 3s infinite", // Add blinking animation
    boxShadow: `0 0 8px ${theme.palette.error.main}`,
  },
  "@keyframes blinking": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0 },
  },
}));

function NavBar({ open, handleDrawerToggle }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
    return (
      <Box>
        <AppBar position="fixed" sx={{ bgcolor: '#ffffff' }} open={open}>
          <Toolbar>
            <IconButton
                color="gray"
                aria-label="open drawer"
                  onClick={handleDrawerToggle}
                edge="start"
                sx={{
                    ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Stack 
              direction="row" 
              alignItems="center" 
              spacing={2}
              sx={{...(open && { display: 'none' }),
              }}
            >
              <img src={logo} alt="" style={{ width: 100, height: 50 }} />
            </Stack>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" color="gray">
                  <Brightness4Icon />
              </IconButton>
              <IconButton size="large" color="gray">
                  <ZoomOutMapIcon />
              </IconButton>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ '& button': { m: 1 } }}>
                <div>
                  <Button size="small" color="success">
                    <Badge badgeContent={6} color="success">
                      Minor
                    </Badge>
                  </Button>
                  <Button size="small" color="error">
                    <Badge badgeContent={4} color="error">
                      Critical
                    </Badge>
                  </Button>
                </div>
              </Box>
              <Divider orientation="vertical" flexItem />
              <IconButton size="large" aria-label="show new mails" color="gray">
                <BlinkingBadge
                  variant="dot" 
                  overlap="circular" 
                >
                  <MailIcon />
                </BlinkingBadge>
              </IconButton>
              <IconButton size="large" aria-label="show 17 new notifications" color="gray">
                <BlinkingBadge variant="dot"  overlap="circular" >
                  <NotificationsIcon />
                </BlinkingBadge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="gray"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="gray"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
}

export default NavBar;