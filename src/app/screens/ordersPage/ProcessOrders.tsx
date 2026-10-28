import React from "react";
import { Box, Stack, Button } from "@mui/material";

export default function ProcessOrders() {
  const orders = [1, 2];

  return (
    <Box className="orders-main">
      <Stack className="orders-list" spacing={3}>
        {orders.map((order) => (
          <Box className="order-card" key={order}>
            <Stack className="order-products">
              {[1, 2, 3].map((item) => (
                <Box className="order-product" key={item}>
                  <Box className="order-product-left">
                    <img src="/img/lavash.webp" alt="Lavash" />
                    <span>Lavash</span>
                  </Box>

                  <Box className="order-product-price">
                    $9 × 2 <strong>=</strong> <span>$18</span>
                  </Box>
                </Box>
              ))}
            </Stack>

            <Box className="order-bottom">
              <Box className="order-total">
                <span>Product price</span>
                <span>$54</span>
                <strong>+</strong>
                <span>Delivery cost</span>
                <span>$2</span>
                <strong>=</strong>
                <span>Total</span>
                <span>$56</span>
              </Box>

              <Box className="order-actions">
                <Button className="payment-btn">FINISH</Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>

      <Stack className="orders-sidebar">
        <Box className="customer-card">
          <Box className="customer-avatar">
            <img src="/img/default-user.png" alt="Customer" />
          </Box>

          <h2>Martin</h2>
          <p>User</p>

          <Box className="customer-address">
            <span>📍</span>
            <span>Do not exist</span>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
