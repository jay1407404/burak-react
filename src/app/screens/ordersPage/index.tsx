import React, { useState } from "react";
import { Box, Button, Container } from "@mui/material";

import PausedOrder from "./PausedOrders";
import ProcessOrder from "./ProcessOrders";
import FinishedOrder from "./FinishedOrders";
import "../../../css/order.css";

type OrderTab = "PAUSE" | "PROCESS" | "FINISH";

export default function Orders() {
  const [activeTab, setActiveTab] = useState<OrderTab>("PAUSE");

  return (
    <Container className="orders-page" maxWidth="xl">
      <Box className="orders-tabs">
        <Button
          className={activeTab === "PAUSE" ? "active-tab" : ""}
          onClick={() => setActiveTab("PAUSE")}
        >
          PAUSED ORDERS
        </Button>

        <Button
          className={activeTab === "PROCESS" ? "active-tab" : ""}
          onClick={() => setActiveTab("PROCESS")}
        >
          PROCESS ORDERS
        </Button>

        <Button
          className={activeTab === "FINISH" ? "active-tab" : ""}
          onClick={() => setActiveTab("FINISH")}
        >
          FINISHED ORDERS
        </Button>
      </Box>

      {activeTab === "PAUSE" && <PausedOrder />}
      {activeTab === "PROCESS" && <ProcessOrder />}
      {activeTab === "FINISH" && <FinishedOrder />}
    </Container>
  );
}
