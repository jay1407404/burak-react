import { Box, Stack, Button } from "@mui/material";
import { Order, OrderItem } from "../../../lib/types/order";
import { serverApi } from "../../../lib/config";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Product } from "../../../lib/types/product";


/** Redux Slice & Selector */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

export default function PausedOrder() {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

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
                <Button variant="contained" color="secondary" className="cancel-btn">
                  Cancel
                </Button>
                <Button variant="contained" className="payment-btn">
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
