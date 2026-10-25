import { Box, Container, Divider, Stack } from "@mui/material"
import React from "react";

export default function Statistics(){
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info" direction="row" spacing={0} sx={{ alignItems: "center" }}>
          <Stack className="static-box">
            <Box className="static-num">12</Box>
            <Box className="static-text">Restaurants</Box>
          </Stack>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 64, width: 2, backgroundColor: "#E3C08D", border: "none" }}
          />

          <Stack className="static-box">
            <Box className="static-num">8</Box>
            <Box className="static-text">Expirience</Box>
          </Stack>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 64, width: 2, backgroundColor: "#E3C08D", border: "none" }}
          />

          <Stack className="static-box">
            <Box className="static-num">50+</Box>
            <Box className="static-text">Menu</Box>
          </Stack>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 64, width: 2, backgroundColor: "#E3C08D", border: "none" }}
          />

          <Stack className="static-box">
            <Box className="static-num">200</Box>
            <Box className="static-text">Clients</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}