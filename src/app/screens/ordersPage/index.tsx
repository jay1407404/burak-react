import React, { SyntheticEvent, useState } from "react";
import { Box, Button, Container } from "@mui/material";

import PausedOrder from "./PausedOrders";
import ProcessOrder from "./ProcessOrders";
import FinishedOrder from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setPausedOrders,
  setProcessOrders,
  setFinishedOrders,
} from "./slice";

import "../../../css/order.css";
import { Order } from "../../../lib/types/order";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
  actionDispatch(useDispatch());

  const [value, setValue] = useState("PAUSE");

  /** HANDLERS **/
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container className="orders-page" maxWidth="xl">
      <Box className="orders-tabs">
        <Button
          className={value === "PAUSE" ? "active-tab" : ""}
          onClick={(e) => handleChange(e, "PAUSE")}
        >
          PAUSED ORDERS
        </Button>

        <Button
          className={value === "PROCESS" ? "active-tab" : ""}
          onClick={(e) => handleChange(e, "PROCESS")}
        >
          PROCESS ORDERS
        </Button>

        <Button
          className={value === "FINISH" ? "active-tab" : ""}
          onClick={(e) => handleChange(e, "FINISH")}
        >
          FINISHED ORDERS
        </Button>
      </Box>

      {value === "PAUSE" && <PausedOrder />}
      {value === "PROCESS" && <ProcessOrder />}
      {value === "FINISH" && <FinishedOrder />}
    </Container>
  );
}
