import React from "react";
import { Box, Stack, Button } from "@mui/material";

export default function PausedOrder() {
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
                <span>$18</span>
                <strong>+</strong>
                <span>Delivery cost</span>
                <span>$2</span>
                <strong>=</strong>
                <span>Total</span>
                <span>$20</span>
              </Box>

              <Box className="order-actions">
                <Button className="cancel-btn">CANCEL</Button>
                <Button className="payment-btn">PAYMENT</Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>

      <Stack className="orders-sidebar" spacing={5}>
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

        <Box className="payment-card">
          <input
            type="text"
            placeholder="Card number : **** 4090 2002 7495"
          />

          <Box className="payment-row">
            <input type="text" placeholder="07 / 24" />
            <input type="text" placeholder="CVV : 010" />
          </Box>

          <input
            type="text"
            placeholder="Justin Robertson"
          />

          <Box className="payment-logos">
            <span>Western Union</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>VISA</span>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}