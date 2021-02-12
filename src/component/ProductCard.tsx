import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: 8,
      width: "calc(50% - 16px)",
    },
    [theme.breakpoints.up("sm")]: {
      margin: 16,
      width: "calc(33.333% - 32px)",
    },
  },
  content: {
    display: "flex",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const images = props.images;
  const id = props.id;
  const price = props.price.toLocaleString();

  // const goToDetail = props.goToDetail()

  return (
    <Card className={classes.root}>
      <Link href="/[id]" as={`/${id}`}>
        <a className={styles.link_none}>
          <CardActionArea>
            <CardMedia
              // onClick={() => goToDetail()}
              className={classes.media}
              image={images[0].src}
              title=""
            />
            <CardContent className={classes.content}>
              <div
              // onClick={() => goToDetail()}
              >
                <Typography color="textSecondary" component="p">
                  {props.title}
                </Typography>
                <Typography className={classes.price} component="p">
                  ￥{price}
                </Typography>
              </div>
              {/* <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton> */}
              {/* <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem 
            // onClick={()=> {
            //   dispatch(push('/product/edit/'+ props.id))
            //   handleClose()
              // }}
              >
              編集する
            </MenuItem>
            <MenuItem onClock={deleteProduct(props.id)}>
              削除する
            </MenuItem>
          </Menu> */}
            </CardContent>
          </CardActionArea>
        </a>
      </Link>
    </Card>
  );
};
export default ProductCard;
