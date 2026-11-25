import { Box, Stack } from "@mui/material";
import { Order, OrderItem } from "../../../lib/types/order";
import { serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";

import { useSelector } from "react-redux";
import { retrieveFinishedOrders } from "./selector";

export default function FinishedOrder() {
  const finishedOrders = useSelector(retrieveFinishedOrders);
  const { authMember } = useGlobals();

  return (
    <Box className="orders-main">
      <Stack className="orders-list" spacing={3}>
        {finishedOrders?.map((order: Order) => (
          <Box key={order._id} className="order-card">
            <Box
              className="order-products"
              sx={{ maxHeight: 250, overflowY: "auto", scrollbarColor: "#aaa0ff transparent" }}
            >
              {!order.orderItems?.length && <p>Product details unavailable for this order.</p>}
              {order.orderItems?.map((item: OrderItem) => {
                const product = order.productData?.find(
                  (entry) => item.productId === entry._id
                );
                const image = product?.productImages?.[0];
                const name = product?.productName ?? "Product unavailable";

                return (
                  <Box key={item._id} className="order-product">
                    <Box className="order-product-left">
                      <img
                        src={image ? `${serverApi}/${image}` : "/img/image-placeholder.svg"}
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
                <span className="finished-label">FINISHED</span>
              </Box>
            </Box>
          </Box>
        ))}

        {!finishedOrders?.length && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/icons/noimage-list.svg"
              alt="No finished orders"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
      {authMember && (
        <Stack className="orders-sidebar" spacing={5}>
          <Box className="customer-card">
            <Box className="customer-avatar">
              <img
                src={authMember.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"}
                alt=""
              />
            </Box>
            <h2>{authMember.memberNick}</h2>
            <p>User</p>
            <Box className="customer-address">
              <img src="/icons/location.svg" alt="" width={22} />
              <span>{authMember.memberAddress || "No address"}</span>
            </Box>
          </Box>

          <Box className="payment-card" aria-label="Payment preview">
            <input aria-label="Card number" placeholder="Card number" readOnly />
            <Box className="payment-row">
              <input aria-label="Expiration date" placeholder="MM / YY" readOnly />
              <input aria-label="Security code" placeholder="CVV" readOnly />
            </Box>
            <input aria-label="Cardholder name" placeholder="Cardholder name" readOnly />
            <Box className="payment-logos">
              <img src="/icons/western-card.svg" alt="Western Union" />
              <img src="/icons/master-card.svg" alt="Mastercard" />
              <img src="/icons/paypal-card.svg" alt="PayPal" />
              <img src="/icons/visa-card.svg" alt="Visa" />
            </Box>
          </Box>
        </Stack>
      )}
    </Box>
  );
}
