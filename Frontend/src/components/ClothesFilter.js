import { useState } from "react";

import Dropdown from "../UI/Dropdown";
import classes from "./ClothesFilter.module.css";

const ClothesFilter = (props) => {
  const [categoryItem, setCategoryItem] = useState("-");
  const [filterItem, setFilterItem] = useState("-");
  const categories = ["-", "색깔", "계절", "종류"];
  const filerItems =
    categoryItem === "색깔"
      ? [
          "레드",
          "옐로우",
          "블루",
          "그린",
          "네이비",
          "베이지",
          "연청",
          "진청",
          "블랙진",
          "크림진",
          "카키",
        ]
      : categoryItem === "계절"
      ? ["여름", "봄/가을", "겨울"]
      : ["상의", "하의"];

  const handleCategoryChange = (item) => {
    setCategoryItem(item);
    props.setCategory(item);
    setFilterItem("-");
    props.setFilter("-");
  };
  const handlefilterChange = (item) => {
    setFilterItem(item);
    props.setFilter(item);
  };

  return (
    <div className={classes["clothes-filter"]}>
      <Dropdown items={categories} onChange={handleCategoryChange}>
        카테고리 선택하기
      </Dropdown>
      {categoryItem === "-" ? (
        ""
      ) : (
        <Dropdown
          items={filerItems}
          onChange={handlefilterChange}
          value={filterItem}
        >
          필터 선택하기
        </Dropdown>
      )}
    </div>
  );
};

export default ClothesFilter;
