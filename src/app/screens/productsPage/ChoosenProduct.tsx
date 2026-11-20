import React from "react";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import { Dispatch } from "@reduxjs/toolkit";
import { setRestaurant, setChosenProduct } from "./slice";
import { createSelector } from "reselect";
import {
  retrieveChosenProduct,
  retrieveRestaurant,
} from "./selector";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Product[]) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product[]) =>
    dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);

const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({
    restaurant,
  })
);


export default function ChosenProduct() {
  const { chosenProduct } = useSelector(chosenProductRetriever);

  if (!chosenProduct) {
    return <Box className="chosen-product">No product selected.</Box>;
  }

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={chosenProduct.productImages.length > 1}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct.productImages.map(
              (ele: string, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <img className="slider-image" src={`${serverApi}/${ele}`} alt={chosenProduct.productName} />
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>{chosenProduct.productName}</strong>
            <span className={"resto-name"}>Burak</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>{chosenProduct.productDesc}</p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>${chosenProduct.productPrice}</span>
            </div>
            <div className={"button-box"}>
              <Button variant="contained">Add To Basket</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
