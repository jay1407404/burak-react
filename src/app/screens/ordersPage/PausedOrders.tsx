import { Box, Stack, Button } from "@mui/material";
import { useState } from "react";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Messages, serverApi } from "../../../lib/config";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Product } from "../../../lib/types/product";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";


/** Redux Slice & Selector */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

export default function PausedOrders({ onPaymentSuccess }: { onPaymentSuccess: () => void }) {
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const [isPaying, setIsPaying] = useState(false);

  /** HANDLERS **/

  const paymentOrderHandler = async (orderId: string) => {
    setIsPaying(true);
    try {
      if (!authMember) throw new Error(Messages.error2);
      const order = new OrderService();
      await order.updateOrder({ orderId, orderStatus: OrderStatus.PROCESS });
      setOrderBuilder(new Date());
      onPaymentSuccess();
    } catch (err) {
      await sweetErrorHandling(err);
    } finally {
      setIsPaying(false);
    }
  };

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.currentTarget.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm(
        "Do you want to delete the order?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className="orders-main">
      <Stack className="orders-list" spacing={3}>
        {pausedOrders?.map((order: Order) => (
          <Box key={order._id} className="order-card">
            <Box className="order-products">
              {order?.orderItems?.map((item: OrderItem) => {
             const product: Product | undefined = order.productData?.filter(
              (ele: Product) => item.productId === ele._id
              )[0];

  const image = product?.productImages?.[0];
  const imagePath = image ? `${serverApi}/${image}` : "/img/image-placeholder.svg";
                const name = product?.productName ?? "Product unavailable";

                return (
                  <Box key={item._id} className="order-product">
                    <Box className="order-product-left">
                      <img
                        src={imagePath}
                        alt={name}
                      />
                      <span>{name}</span>
                    </Box>
                    <Box className="order-product-price">
                      ${item.itemPrice} × {item.itemQuantity} <strong>=</strong>
                      <span>${item.itemQuantity * item.itemPrice}</span>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box className="order-bottom">
              <Box className="order-total">
                <span>Product price</span>
                <span>${order.orderTotal - order.orderDelivery}</span>
                <strong>+</strong>
                <span>Delivery cost</span>
                <span>${order.orderDelivery}</span>
                <strong>=</strong>
                <span>Total</span>
                <span>${order.orderTotal}</span>
              </Box>
              <Box className="order-actions">
                <Button 
                variant="contained"
                value={order._id}
                color="secondary" 
                className="cancel-btn"
                onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button 
                variant="contained"
                className="payment-btn"
                disabled={isPaying}
                onClick={() => paymentOrderHandler(order._id)}>
                  Payment
                </Button>
              </Box>
            </Box>
          </Box>
        ))}

        {!pausedOrders?.length && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/icons/noimage-list.svg"
              alt="No paused orders"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}
