import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import OrdersLayout from "./OrdersLayout";
import { retrieveProcessOrders } from "./selector";

export default function ProcessOrders() {
  const orders = useSelector(retrieveProcessOrders);

  return (
    <OrdersLayout
      orders={orders}
      emptyLabel="No orders in process"
      actions={<Button className="payment-btn">FINISH</Button>}
    />
  );
}
