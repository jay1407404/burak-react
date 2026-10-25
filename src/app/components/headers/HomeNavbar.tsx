import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";


export function HomeNavbar() {
    const authMember = null;


    return (
        <div className="home-navbar">
            <Container sx={{ mt: "55px", height: "642px" }}>
                <Stack
                    sx={{ height: "50px", justifyContent: "space-between", alignItems: "center", gap: 3 }}
                    direction={"row"}
                >
                    <Box sx={{ flexShrink: 0 }}>
                        <NavLink to="/">
                            <img style={{ width: "125px", height: "30px" }} src={`${process.env.PUBLIC_URL}/icons/burak.svg`} alt="Burak" />
                        </NavLink>
                    </Box>
                    <Stack
                        direction={"row"}
                        sx={{ maxWidth: "700px", width: "100%", justifyContent: "space-between", alignItems: "center", gap: 2 }}
                    >
                        <Box className={"hover-line"}>
                            <NavLink to="/" activeClassName={"underline"}>Home</NavLink>
                        </Box>
                        <Box className={"hover-line"}>
                            <NavLink to="/products" activeClassName={"underline"}>Products</NavLink>
                        </Box>
                        {authMember ? (
                            <Box className={"hover-line"}>
                                <NavLink to="/orders" activeClassName={"underline"}>Orders</NavLink>
                            </Box>
                        ) : null}
                        {authMember ? (
                            <Box className={"hover-line"}>
                                <NavLink to="/member-page" activeClassName={"underline"}>My Page</NavLink>
                            </Box>
                        ) : null}
                        <Box className={"hover-line"}>
                            <NavLink to="/help" activeClassName={"underline"}>Help</NavLink>
                        </Box>
                        {/* BASKET */}

                        {!authMember ? (
                            <Box>
                                <Button variant="contained" style={{ background: "#3776CC", color: "#f8f8ff" }}>Login</Button>
                            </Box>
                        ) : (
                            <img />
                        )}
                    </Stack>
                </Stack>
                <Stack>DETAIL</Stack>
            </Container>
        </div>
    );
}
