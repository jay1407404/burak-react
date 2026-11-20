import React, { useEffect, useMemo } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { Badge, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import type { Product } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { serverApi } from "../../../lib/config";

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});



/* Hardcoded example kept for reference; the component now reads Redux products.
const products = [
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];
*/



export default function Products() {
  const dispatch = useDispatch();
  const { setProducts } = useMemo(() => actionDispatch(dispatch), [dispatch]);
  const {products} = useSelector(productsRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [setProducts]);


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
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                 const sizeVolume =
                 product.productCollection === ProductCollection.DRINK
                  ? product.productVolume + " litre"
                  : product.productSize + " size";
                  return (
                    <Stack key={index} className={"product-card"}>
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${serverApi}/${imagePath})`,
                        }}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>

                        <Button className={"shop-btn"}>
                          <img
                            src={"/icons/shopping-cart.svg"}
                            alt="Shopping cart"
                            style={{ display: "flex" }}
                          />
                        </Button>

                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge 
                          badgeContent={product.productViews} 
                          color="secondary">
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>

                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
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
