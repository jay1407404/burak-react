import { Box, Stack, Button } from "@mui/material";
import moment from "moment";
import { Order, OrderItem } from "../../../lib/types/order";
import { serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { useSelector } from "react-redux";
import { retrieveProcessOrders } from "./selector";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

export default function ProcessOrders() {
  const { processOrders } = useSelector(processOrdersRetriever);
  const { authMember } = useGlobals();

  return (
    <Box className="orders-main">
      <Stack className="orders-list" spacing={3}>
        {processOrders?.map((order: Order) => (
          <Box key={order._id} className="order-card">
  <Box className="order-products" sx={{ maxHeight: 250, overflowY: "auto" }}>
    {order?.orderItems?.map((item: OrderItem) => {
      const product: Product | undefined = order.productData?.filter(
        (ele: Product) => item.productId === ele._id
      )[0];

      const image = product?.productImages?.[0];
      const imagePath = image ? `${serverApi}/${image}` : "/img/image-placeholder.svg";
      return (
        <Box key={item._id} className="order-product">
          <Box className="order-product-left">
          <img
            src={imagePath}
            alt=""
          />
          <p className={"title-dish"}>{product?.productName ?? "Product unavailable"}</p>
          </Box>
          <Box className="order-product-price">
            <p>${item.itemPrice}</p>
            <img src={"/icons/close.svg"} alt="" />
            <p>{item.itemQuantity}</p>
            <img src={"/icons/pause.svg"} />
            <p style={{ marginLeft: "15px" }}>
              ${item.itemQuantity * item.itemPrice}
            </p>
          </Box>
                  </Box>
                );
              })}
            </Box>

            <Box className="order-bottom">
  <Box className="order-total">
    <p>Product price</p>
    <p>${order.orderTotal - order.orderDelivery}</p>
    <img
      src={"/icons/plus.svg"}
      style={{ marginLeft: "20px" }}
    />
    <p>delivery cost</p>
    <p>${order.orderDelivery}</p>
    <img
      src={"/icons/pause.svg"}
      style={{ marginLeft: "20px" }}
    />
    <p>Total</p>
    <p>${order.orderTotal}</p>
  </Box>
  <p className={"data-comp"}>
    {moment().format("YY-MM-DD HH:mm")}
  </p>
  <Box className="order-actions">
  <Button variant="contained" className="payment-btn">
    Verify to Fulfil
  </Button>
  </Box>
</Box>
          </Box>
        ))}

        {!processOrders ||
  (processOrders.length === 0 && (
    <Box
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    >
      <img
        src={"/icons/noimage-list.svg"}
        style={{ width: 300, height: 300 }}
      />
    </Box>
  ))}
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
