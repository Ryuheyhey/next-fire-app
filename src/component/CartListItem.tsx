import React from "react";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { List } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: "100%",
  },
});

const CartListItem = (props) => {
  const classes = useStyles();

  const product = props.product;
  const image = product.img;
  const title = product.title;
  const price = product.price.toLocaleString();

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="商品画像" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText primary={title} />
          <ListItemText primary={"¥ " + price} />
        </div>
        <IconButton onClick={() => props.removeProductFromCart()}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartListItem;
