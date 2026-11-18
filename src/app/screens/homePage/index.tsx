import React, { useEffect } from "react";
import "../../../css/home.css";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishe";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";


import { useDispatch } from "react-redux";
import { setPopularDishes } from "./slice";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";


//** REDUX SLICE & SELECTOR */

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 4,
      order: "productView",
      productCollection: ProductCollection.DISH,
    })
    .then(data => {
      console.log("data passed here:", data);
      dispatch(setPopularDishes(data));
    })
    .catch((err) => console.log(err))
  }, [dispatch]);


  //components
  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}

