import { FC, useContext, useEffect, useState } from "react";
import { Product } from "shopify-buy";
import { GetStaticPaths, GetStaticProps } from "next";
import Router from "next/router";
import { getAllProductIds } from "../lib/shopify";
import { client } from "../utils/client";
import styles from "../../styles/Home.module.css";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { ComponentButton } from "../component";
import {
  CartContext,
  CartContextType,
  CartContextProvider,
} from "../context/CartContext";

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    borderRadius: 10,
    border: "solid 3px #990000",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      heiht: 320,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      heiht: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "32px auto 16px auto",
      heiht: "auto",
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "32px auto",
      heiht: "auto",
      width: 400,
    },
  },
  description: {
    margin: "1rem auto",
    textAlign: "center",
    width: 320,
  },
}));

type DetailProps = {
  product?: Product;
  errors?: string;
};

// idのパスを取得する
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllProductIds();

  return {
    paths,
    fallback: false,
  };
};

// Indexページでクリックした商品をビルド時に取得、なければエラーを返す
export const getStaticProps: GetStaticProps<DetailProps> = async ({
  params,
}) => {
  try {
    const id = params?.id;
    if (!id) {
      return { props: { errors: "予期せぬエラーが発生しました。" } };
    }
    const productRes = await client.product.fetch(id as string);
    const product = JSON.parse(JSON.stringify(productRes));

    return { props: { product: product } };
  } catch (err) {
    return { props: { errors: "予期せぬエラーが発生しました。" } };
  }
};

const DetailPages: FC<DetailProps> = (props) => {
  const classes = useStyles();
  const { product, errors } = props;
  const [checkoutLink, setCheckoutLink] = useState<string>("");
  const price = product.variants[0].price;

  // console.log(product.title)
  // console.log(product.images[0].src)

  const cart = useContext(CartContext);

  const addToCart = () => {
    const productsList = cart.products;
    productsList.push({
      title: product.title,
      img: product.images[0].src,
      price: product.variants[0].price,
      variantsId: product.variants[0].id,
    });

    cart.setProducts(productsList);

    return Router.push("/cart");
  };

  if (errors) {
    return <p>Error: {props.errors}</p>;
  }
  if (!product) {
    return <p>Error: Product not found</p>;
  }

  useEffect(() => {
    client.checkout.create().then((checkout: any) => {
      const variantsId: any = product?.variants[0].id;
      client.checkout
        .addLineItems(checkout.id, [{ variantId: variantsId, quantity: 1 }])
        .then((checkout: any) => {
          console.log(checkout);
          setCheckoutLink(checkout.webUrl);
          console.log(typeof product.variants[0].id);
        });
      console.log(checkout);
    });
  }, []);

  return (
    <section className={styles.wrapin_detail}>
      <div className={styles.medium} />
      <div className={styles.medium} />
      <div className={styles.row}>
        <div className={classes.image}>
          <img
            src={product.images[0].src}
            height={400}
            className={styles.media}
          />
          {/* </div> */}
        </div>
        <div className={classes.detail}>
          <h1 className={styles.headline}>{product.title}</h1>
          <div className={styles.medium} />

          <p className={classes.description}>{product.description}</p>
          <div className={styles.medium} />

          <h1 className={styles.headline}>¥ {price}</h1>

          <div className={styles.medium} />

          <div className={styles.center}>
            <ComponentButton
              label={"購入画面へ"}
              onClick={() => Router.push(checkoutLink)}
            />
          </div>
          <div className={styles.center}>
            <ComponentButton
              label={"カートに追加"}
              onClick={() => addToCart()}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailPages;
