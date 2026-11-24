import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { Route, Switch, useLocation } from "react-router-dom";
import  HomePage from "./screens/homePage";
import  ProductsPage from "./screens/productsPage";
import  OrdersPage from "./screens/ordersPage";
import  UserPage from "./screens/userPage";
import  HomeNavbar  from "./components/headers/HomeNavbar";
import  OtherNavbar from "./components/headers/OtherNavbar";
import  Footer from "./components/footer";
import  HelpPage from "./screens/helpPage";
import Test from "./screens/Test";
import useBasket from "./hooks/useBasket";
import { useState, type MouseEvent } from "react";
import AuthenticationModal from "./components/auth";
import "../css/app.css";
import "../css/navbar.css"
import "../css/footer.css"
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";

function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onRemove,onDelete,onDeleteAll, } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

/** HANDLERS */

const handleSignupClose = () => setSignupOpen(false);
const handleLoginClose = () => setLoginOpen(false);

const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(e.currentTarget);
};

const handleCloseLogout = () => setAnchorEl(null);

const handleLogoutRequest = async () => {
  handleCloseLogout();
  try {
    const member = new MemberService();
    await member.logout();

    await sweetTopSuccessAlert("success", 700);
    setAuthMember(null);
  } catch (err) {
    console.log(err);
    sweetErrorHandling(Messages.error1);
  }
};



  return (
    <>
      {location.pathname === "/" ? (
      <HomeNavbar cartItems={cartItems} 
      onAdd={onAdd}
      onRemove={onRemove}
      onDelete={onDelete}
      onDeleteAll={onDeleteAll}
      setSignupOpen={setSignupOpen}
      setLoginOpen={setLoginOpen}
      handleLogoutClick={handleLogoutClick}
      /> 
      ):(
      <OtherNavbar cartItems={cartItems} 
      onAdd={onAdd}
      onRemove={onRemove}
      onDelete={onDelete}
      onDeleteAll={onDeleteAll}
      setSignupOpen={setSignupOpen}
      setLoginOpen={setLoginOpen}
      handleLogoutClick={handleLogoutClick}
      />
      )}

      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseLogout}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogoutRequest}>
          <ListItemIcon>
            <Logout fontSize="small" style={{ color: "blue" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
           <HomePage /> 
        </Route>
      </Switch>
      <Footer />

      <AuthenticationModal
      signupOpen={signupOpen}
      loginOpen={loginOpen}
      handleLoginClose={handleLoginClose}
      handleSignupClose={handleSignupClose}
/>
    </>
  );
};

export default App;


