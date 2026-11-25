import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import OrdersLayout from "./OrdersLayout";
import { retrievePausedOrders } from "./selector";

export default function PausedOrder() {
  const orders = useSelector(retrievePausedOrders);

  return (
    <OrdersLayout
      orders={orders}
      emptyLabel="No paused orders"
      actions={<>
          <Button variant="contained" color="secondary" className="cancel-btn">
            Cancel
          </Button>
          <Button variant="contained" className="payment-btn">
            Payment
          </Button>
        </>}
    />
  );
}
