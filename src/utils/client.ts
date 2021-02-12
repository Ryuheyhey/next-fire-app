import Client from "shopify-buy";

// storefrontAPIを使用できるようにする
export const client = Client.buildClient({
  domain: "nexjs-ecapp-example.myshopify.com",
  storefrontAccessToken: "bf78f7a6a840b9f0ba140832b59e7360",
});

// // ビルド時に商品一覧取得
// export async function getAllProducts() {
//   const products: any = await client.product.fetchAll()
//   return {
//       products: JSON.parse(JSON.stringify(products))
//     }
// }
