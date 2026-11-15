import React, { useEffect } from "react";
import "../../../css/home.css";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishe";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";

export default function HomePage() {
  // Selector: Store => Data

  useEffect(() => {
    // Backend server data request => Data

    // slice: Data => Store
  }, []);

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

