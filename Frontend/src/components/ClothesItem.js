import { Link } from "react-router-dom";

import classes from "./ClothesItem.module.css";
import colorToHex from "../util/colorToHex";

const ClothesItem = (props) => {
  const hex = colorToHex[props.color];
  const clothesType = props.is_upper ? "clothes" : "trousers";
  const clothesIcon = (
    <img
      width="50"
      height="50"
      src={`https://img.icons8.com/ios-filled/50/${hex}/${clothesType}.png`}
      alt={clothesType}
    />
  );

  const seasonIcon = (
    <img
      width="25"
      height="25"
      src={`https://img.icons8.com/ios-filled/50/${props.season}.png`}
      alt={props.season}
      className={classes.season}
    />
  );

  return (
    <div className={classes["clothes-item"]}>
      <Link to={`/clothes/${props.id}/edit`}>{clothesIcon}</Link>
      {seasonIcon}
    </div>
  );
};

export default ClothesItem;
