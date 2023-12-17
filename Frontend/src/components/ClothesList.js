import { useState, useEffect } from "react";

import AddClothesItem from "./AddClothesItem";
import ClothesFilter from "./ClothesFilter";
import ClothesItem from "./ClothesItem";

import classes from "./ClothesList.module.css";
import korToEng from "../util/korToEng";

const ClothesList = (props) => {
  const [category, setCategory] = useState("-");
  const [filter, setFilter] = useState("-");
  const [filteredItems, setFilteredItems] = useState(props.clothesData);

  useEffect(() => {
    console.log(category, filter);

    setFilteredItems(
      props.clothesData.filter((data) => {
        if (filter === "-") return true;
        else if (category === "색깔") return data.color === korToEng[filter];
        else if (category === "계절") return data.season === filter;
        else if (category === "종류") return data.is_upper === filter;
        else return true;
      })
    );
  }, [category, filter, props.clothesData]);

  return (
    <div className={classes["clothes-list"]}>
      <ClothesFilter setCategory={setCategory} setFilter={setFilter} />

      <div className={classes.container}>
        {filter === "-" ? <AddClothesItem /> : ""}
        {filteredItems.map((clothesData) => (
          <ClothesItem
            id={clothesData.clothes_id}
            key={clothesData.clothes_id}
            color={clothesData.color}
            season={clothesData.season}
            is_upper={clothesData.is_upper}
            state={clothesData.state}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesList;
