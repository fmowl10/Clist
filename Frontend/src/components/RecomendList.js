import ClothesItem from "./ClothesItem";
import classes from "./RecommendList.module.css";

const RecommendList = (props) => {
  return (
    <div className={classes["clothes-list"]}>
      <div className={classes.container}>
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
    </div>
  );
};

export default RecommendList;
