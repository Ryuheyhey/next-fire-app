import { client } from "../utils/client";
import { Product } from "shopify-buy";

// ビルド時に商品一覧取得
export const getAllProducts = async () => {
  const products: Product[] = await client.product.fetchAll();
  return {
    products: JSON.parse(JSON.stringify(products)),
  };
};

export const getAllProductIds = async () => {
  const products: Product[] = await client.product.fetchAll();
  const paths = products.map((product) => ({
    params: {
      id: product.id.toString(),
    },
  }));
  return paths;
};
