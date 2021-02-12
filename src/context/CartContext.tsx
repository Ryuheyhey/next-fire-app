import { title } from "process";
import React, { createContext, useContext, FC, useState } from "react";

export interface CartContextType {
  products: Array<any>;
  setProducts: (products: Array<any>) => void;
}

// Contextの作成
export const CartContext = createContext<CartContextType>({
  products: [],
  setProducts: (products: Array<any>) => {},
});

export const CartContextProvider: FC = ({ children }) => {
  const context: CartContextType = useContext(CartContext);

  const [products, setProducts] = useState(context.products);

  const newCart: CartContextType = {
    products,
    setProducts,
  };

  return (
    <CartContext.Provider value={newCart}>{children}</CartContext.Provider>
  );
};
// export interface CartContextType {
//   title: string
//   img: string
//   price: string
//   variantId: string
//   setTitle: (title: string) => void
//   setImg: (img: string) => void
//   setPrice: (price: string) => void
//   setVariantId: (variantId: string) => void
// }

// // Contextの作成
// export const CartContext = createContext<CartContextType>({
//   title: "",
//   img: "",
//   price: "",
//   variantId: "",
//   setTitle: (title: string) => {},
//   setImg: (img: string) => {},
//   setPrice: (price: string) => {},
//   setVariantId: (variantId: string) => {}
// })

// export const CartContextProvider: FC = ({children}) => {
//   const context: CartContextType = useContext(CartContext)

//   const [title, setTitle] = useState(context.title)
//   const [img, setImg] = useState(context.img)
//   const [price, setPrice] = useState(context.price)
//   const [variantId, setVariantId] = useState(context.variantId)

//   const newCart: CartContextType = {
//     title, setTitle, img, setImg, price, setPrice, variantId, setVariantId
//   }

//   return (
//     <CartContext.Provider value={newCart}>
//       {children}
//     </CartContext.Provider>
//   )
// }
