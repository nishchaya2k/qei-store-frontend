import { createContext,useEffect,useState } from "react";
import { useLocation } from "react-router-dom";

// Create a Context object.
export const Context = createContext();


// Create a Provider component.
const AppContext = ({children}) => {
   
   const [categories, setCategories] = useState();
   const [products, setProducts] = useState();
   const [showCart, setShowCart] = useState(false);
   const [cartItems, setCartItems] = useState([]);          //cartItems is an array contain all the products
   const [cartCount, setCartCount] = useState(0);
   const [cartSubTotal, setCartSubTotal] = useState(0);
   const location = useLocation();

   //we will pass all the states which we want them to be available globally for the all components
   //we will write them in values     
   
   useEffect(()=>{
      window.scrollTo({
         top: 0,
         left: 0,
         // behavior: "smooth",
       });
   },[location]);

   useEffect(() => {
      let count = 0;
      cartItems?.map((item) => (count += item.attributes.quantity));
      setCartCount(count);

      let subTotal = 0;
      cartItems.map(
          (item) =>
              (subTotal += item.attributes.price * item.attributes.quantity)
      );
      setCartSubTotal(subTotal);
  }, [cartItems]);

   
   const handleAddToCart = (product, quantity) => {
      let items = [...cartItems];            //shallow copy of cartItems
      let index = items?.findIndex((p) => p.id === product?.id); //find if the current selected item index is in the items or in the cartItems or not
      if (index !== -1) {
          items[index].attributes.quantity += quantity;           //if yes, item already present, increase its quantity,    this line ->  "items[index].attributes.quantity" is path where we need to increament the quantity
      } else {
          product.attributes.quantity = quantity;                 //if no, initialize the quantity for the product
          items = [...items, product];   //we have cancatenate the newly added product with array them reinitialize or updated the array using cancatenate with the  help of spread operator
      }
      setCartItems(items);   //updated the 'cartItems' state
  };

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items?.filter((p) => p.id !== product?.id);  //except the selected product for the removal, filter out all the products and then update the state
    setCartItems(items); 
    
  }

  const handleCartProductQuantity = (type, product) => {
   let items = [...cartItems];
   let index = items?.findIndex((p) => p.id === product?.id);
   if (type === "inc") {
       items[index].attributes.quantity += 1;
   } else if (type === "dec") {
       if (items[index].attributes.quantity === 1) return;
       items[index].attributes.quantity -= 1;
   }
   setCartItems(items);
};



// Make the user available to all descendant components.
    return <Context.Provider 
               value={{
               categories,
               setCategories,
               products,
               setProducts,
               cartItems,
               setCartItems,
               handleAddToCart,
               cartCount,
               handleRemoveFromCart,
               showCart,
               setShowCart,
               handleCartProductQuantity,
               cartSubTotal,
               }}>

                {children}
           </Context.Provider>
};

export default AppContext;


/* 
 React Context is a method to pass props from parent to child component(s),
 by storing the props in a store(similar in Redux) and using these props from the 
 store by child component(s) without actually passing them manually at each level of
 the component tree.

1. React Context is a feature that allows you to easily share data between components 
   without having to pass props down manually. This is useful for data that needs to be
   accessed by multiple components, such as the current user or the current theme.

2. To use Context, you first need to create a Context object. This object will store the 
   data that you want to share. Once you have created the Context object, you can create a
   Provider component. This component will make the data available to all of its descendant 
   components. 
   
3. Finally, you can use the useContext hook to access the data in any component.
   The useContext hook will return the value of the Context object for the current component.

4. Basically we can refer AppContext is a higher higher order component in which we will
   wrap all the components. Now, all the states we will create in AppContext we can use 
   them in all the childrens(all the components it contained).

5. the states we need at multiple places, we create here like cart logic (update,delete,..etc) and so many states

6. in this file now we will maintain states for the categories and for the products
*/


/*
Shallow Copy

The shallowCopy array will now contain the same elements as the arr array, but
they will be stored in different memory locations. This means that changes to 
the arr array will not be reflected in the shallowCopy array.
The spread operator can also be used to create a shallow copy of nested arrays.
 For example:
const arr = [1, 2, 3];
const shallowCopy = [...arr];
 
The spread operator (...) is a JavaScript operator

*/