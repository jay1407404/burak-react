import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { Badge, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface Product {
  productName: string;
  imagePath: string;
  price?: number;
}

const products: Product[] = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];


export default function Products() {
  return (
    <div className={"products"}>
      <Container maxWidth={false}>
        <Stack direction="column" sx={{ alignItems: "center" }}>
          <Stack className={"avatar-big-box"}>
            <Stack className={"static-box"}>
              <Box className={"static-text"}>
                Burak Restaurant
              </Box>
            </Stack>

            <Stack className={"search-box"} direction="row" spacing={0}>
              <input type="text" placeholder="Type here" />
              <Button className={"search-btn"}>
                SEARCH <SearchIcon />
              </Button>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={"primary"}
                className={"order"}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button variant={"contained"} color={"secondary"}>
                  Other
                </Button>
                <Button variant={"contained"} color={"secondary"}>
                  Dessert
                </Button>
                <Button variant={"contained"} color={"secondary"}>
                  Drink
                </Button>
                <Button variant={"contained"} color={"secondary"}>
                  Salad
                </Button>
                <Button variant={"contained"} color={"primary"}>
                  Dish
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product, index) => {
                  return (
                    <Stack key={index} className={"product-card"}>
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${product.imagePath})`,
                        }}
                      >
                        <div className={"product-sale"}>
                          Normal size
                        </div>

                        <Button className={"shop-btn"}>
                          <img
                            src={"/icons/shopping-cart.svg"}
                            alt="Shopping cart"
                            style={{ display: "flex" }}
                          />
                        </Button>

                        <Button className={"view-btn"}>
                          <Badge badgeContent={20} color="secondary">
                            <RemoveRedEyeIcon
                              sx={{
                                color: 20 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>

                      <Box className={"product-name"}>
                        {product.productName}
                      </Box>

                      <Box className={"product-price"}>
                        <span className={"price-icon"}>$</span>
                        {product.price ?? 15}
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box>No products found</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination count={3} page={1} color="primary" />
          </Stack>
        </Stack>
      </Container>
      <div className={"brands-logo"}>
  <Container>
    <Stack className={"brands-content"}>
      <Box className={"brands-title"}>Our Family Brands</Box>

      <Stack className={"brands-wrapper"} direction="row">
        <img src="/img/burak-gurme.png" alt="Burak Gurme" />
        <img src="/img/burak-sweets.png" alt="Burak Sweets" />
        <img src="/img/burak-seafood.png" alt="Burak Seafood" />
        <img src="/img/burak-doner.png" alt="Burak Doner" />
      </Stack>
    </Stack>
  </Container>
</div>

<div className={"address"}>
  <Container>
    <Stack className={"address-area"}>
      <Box className={"title"}>Our address</Box>
      <iframe
        style={{ marginTop: "60px" }}
        src="https://www.google.com/maps?q=CZN+Burak+Restaurant+Istanbul&output=embed"
        width="1320"
        height="500"
        referrerPolicy="no-referrer-when-downgrade"
        title="Burak Restaurant Location"
      ></iframe>
    </Stack>
  </Container>
</div>
    </div>
  );
}
