import ClothesItem from "./ClothesItem";
import classes from "./ClothesList.module.css";

const RecommendList = (props) => {
  return (
    <div className={classes["clothes-list"]}>
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

export default RecommendList;
