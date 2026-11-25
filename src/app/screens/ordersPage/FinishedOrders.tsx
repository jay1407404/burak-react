import { useSelector } from "react-redux";
import OrdersLayout from "./OrdersLayout";
import { retrieveFinishedOrders } from "./selector";

export default function FinishedOrder() {
  const orders = useSelector(retrieveFinishedOrders);

  return (
    <OrdersLayout
      orders={orders}
      emptyLabel="No finished orders"
      actions={<span className="finished-label">FINISHED</span>}
    />
  );
}
