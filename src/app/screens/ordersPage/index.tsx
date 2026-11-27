import React, { SyntheticEvent, useEffect, useLayoutEffect, useState } from "react";
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
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
  actionDispatch(useDispatch());
  const{ orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("PAUSE");

  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
  page: 1,
  limit: 5,
  orderStatus: OrderStatus.PAUSE,
});

useEffect(() => {
  const order = new OrderService();

  order
  .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
  .then((data) => setPausedOrders(data))
  .catch((err) => console.log(err))

  order
  .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
  .then((data) => setProcessOrders(data))
  .catch((err) => console.log(err))

  order
  .getMyOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
  .then((data) => setFinishedOrders(data))
  .catch((err) => console.log(err))
}, [orderInquiry, orderBuilder]);


  /** HANDLERS **/
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
 if (!authMember) history.push("/");
  //My page ga auth bo'lmasdan kirsa Home page ga qaytaradigan mantiq

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

      {value === "PAUSE" && <PausedOrder onPaymentSuccess={() => setValue("PROCESS")} />}
      {value === "PROCESS" && <ProcessOrder onFulfilSuccess={() => setValue("FINISH")} />}
      {value === "FINISH" && <FinishedOrder />}
    </Container>
  );
}
