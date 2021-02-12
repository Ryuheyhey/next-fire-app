import Router from "next/router";
import { useContext, useEffect } from "react";
import {
  CartContext,
  CartContextType,
  CartContextProvider,
} from "../context/CartContext";
import styles from "../../styles/Home.module.css";
import React, { useCallback, useState } from "react";
import List from "@material-ui/core/List";
import { CartListItem } from "../component";
import { ComponentButton } from "../component";
import { makeStyles } from "@material-ui/styles";
import { client } from "../utils/client";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
});

const CartList = () => {
  const cart: CartContextType = useContext(CartContext);
  const productsInCart = cart.products;
  const [checkoutLink, setCheckoutLink] = useState<string>("");

  const classes = useStyles();

  const lineItems = productsInCart.map((product) => {
    console.log(product);
    const lineItem = {
      variantId: product.variantsId,
      quantity: 1,
    };

    return lineItem;
  });

  const removeProductFromCart = (i) => {
    productsInCart.splice(i, 1);
    return cart.setProducts(productsInCart);
  };

  useEffect(() => {
    client.checkout.create().then((checkout: any) => {
      client.checkout
        .addLineItems(checkout.id, lineItems)
        .then((checkout: any) => {
          console.log(checkout);
          setCheckoutLink(checkout.webUrl);
        });
    });
  }, [removeProductFromCart]);

  return (
    <section className={styles.wrapin}>
      <h2 className={styles.headline}>ショッピングカート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 ? (
          productsInCart.map((product, i) => (
            <CartListItem
              key={product.variantsId}
              product={product}
              index={i}
              removeProductFromCart={() => removeProductFromCart(i)}
            />
          ))
        ) : (
          <h2 className={styles.text_center}>カートの中身がありません。</h2>
        )}
      </List>
      <div className={styles.medium} />
      <div className="p-grid__column">
        <ComponentButton
          label={"レジへ進む"}
          onClick={() => Router.push(checkoutLink)}
        />
        <div className="module-spacer--extra-extra-small" />
        <ComponentButton
          label={"ショッピングを続ける"}
          onClick={() => Router.push("/")}
        />
      </div>
    </section>
  );
};

export default CartList;
