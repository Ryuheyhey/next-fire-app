import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import React, { useEffect, FC, useState, useContext } from "react";
import Link from "next/link";
import { auth } from "../utils/firebase";
import { ComponentButton, ProductCard } from "../component";
import { Product } from "shopify-buy";
import { GetStaticProps } from "next";
import { getAllProducts } from "../lib/shopify";
import {
  CartContext,
  CartContextType,
  CartContextProvider,
} from "../context/CartContext";

export const getStaticProps: GetStaticProps = async () => {
  const allProducts = await getAllProducts();

  return {
    props: {
      allProducts,
    },
  };
};

type IndexProps = {
  allProducts: {
    products: Product[];
  };
};

const Home: FC<IndexProps> = ({ allProducts }) => {
  const products = allProducts.products;
  const [currentUser, setCurrenUser] = useState<null | object>(null);
  const router = useRouter();

  const cart = useContext(CartContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrenUser(user) : router.push("/signin");
      console.log(user);
    });
  }, []);

  return (
    <section className={styles.wrapin}>
      <h1 className={styles.headline}>商品一覧</h1>
      <div className={styles.row}>
        {products.length > 0 &&
          products.map((product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              images={product.images}
              title={product.title}
              price={product.variants[0].price}
            />
          ))}
      </div>
    </section>
  );
};

export default Home;
