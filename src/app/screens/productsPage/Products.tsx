import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Box, Button, Container, PaginationItem, Stack } from "@mui/material";
import { Badge, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import type { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products })
);

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});


export default function Products() {
  const dispatch = useDispatch();
  const { setProducts } = useMemo(() => actionDispatch(dispatch), [dispatch]);
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("")
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch, setProducts]);

  useEffect(() => {
  if (searchText === "") {
    productSearch.search = "";
    setProductSearch({ ...productSearch });
  }
}, [searchText]);


  /** HANDLERS */

  const searchCollectionHandler = (collection: ProductCollection) => {
  productSearch.page = 1;
  productSearch.productCollection = collection;
  setProductSearch({ ...productSearch });
};

const searchOrderHandler = (order: string) => {
  productSearch.page = 1;
  productSearch.order = order;
  setProductSearch({ ...productSearch });
};

const searchProductHandler = () => {
  productSearch.search = searchText;
  setProductSearch({...productSearch});
};

const paginationHandler = (e: ChangeEvent<any>, value: number) => {
  productSearch.page = value;
  setProductSearch({ ...productSearch });
};

const chooseDishHandler = (id:string) => {
  history.push(`/products/${id}`)
}


  return (
    <div className={"products"}>
      <Container>
      <Stack direction="column" sx={{ alignItems: "center" }}>
    <Stack className={"avatar-big-box"}>
      <Stack className={"top-text"}>
        <p>Burak Restaurant</p>
        <Stack className={"single-search-big-box"}>
          <input
            type={"search"}
            className={"single-search-input"}
            name={"singleResearch"}
            placeholder={"Type here"}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchProductHandler();
            }}
          />
          <Button
            className={"single-button-search"}
            variant="contained"
            endIcon={<SearchIcon />}
            onClick={searchProductHandler}
          >
            Search
          </Button>
        </Stack>
          </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                className={"order"}
                color={productSearch.order === "createdAt"? "primary" : "secondary"}
                onClick={() => searchOrderHandler("createdAt")}

              >
                New
              </Button>
              <Button
                className={"order"}
                variant={"contained"}
                color={productSearch.order === "productPrice"? "primary" : "secondary"}
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={productSearch.order === "productViews"? "primary" : "secondary"}
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.OTHER ? "primary" : "secondary"}
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}>
                  Other
                </Button>
                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.DESSERT ? "primary" : "secondary"}
                onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}>
                  Dessert
                </Button>
                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.DRINK ? "primary" : "secondary"}
                onClick={() => searchCollectionHandler(ProductCollection.DRINK)}>
                  Drink
                </Button>
                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.SALAD ? "primary" : "secondary"}
                onClick={() => searchCollectionHandler(ProductCollection.SALAD)}>
                  Salad
                </Button>
                <Button variant={"contained"} color={productSearch.productCollection === ProductCollection.DISH ? "primary" : "secondary"}
                onClick={() => searchCollectionHandler(ProductCollection.DISH)}>
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
                    <Stack 
                    key={product._id} 
                    className={"product-card"}
                    onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${imagePath})`,
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
            <Pagination
           count={
            products.length === productSearch.limit
            ? productSearch.page + 1
            : productSearch.page
           }
           page={productSearch.page}
          renderItem={(item) => (
          <PaginationItem
          slots={{
          previous: ArrowBackIcon,
          next: ArrowForwardIcon,
        }}
        {...item}
      color={"secondary"}
    />
  )}
  onChange={paginationHandler}
/>
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
