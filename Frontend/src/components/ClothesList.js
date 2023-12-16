import AddClothesItem from "./AddClothesItem";
import ClothesItem from "./ClothesItem";
import classes from "./ClothesList.module.css";

const ClothesList = (props) => {
  return (
    <div className={classes["clothes-list"]}>
      <AddClothesItem />
      {console.log(props.clothesData)}
      {props.clothesData.map((clothesData) => (
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
  );
};

export default ClothesList;
